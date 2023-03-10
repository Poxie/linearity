from flask import Blueprint, request, jsonify
from utils.common import get_task_by_id, get_member, get_assignee, get_task_assignees, get_label_by_id, get_task_label, get_block_by_id, get_block_tasks
from utils.constants import PATCH_TASK_ALLOWED_PROPERTIES
from utils.auth import token_required
from database import database
from time import time

tasks = Blueprint('tasks', __name__)

@tasks.get('/tasks/<int:task_id>')
@token_required
def get_group_task_route(task_id: int, token_id: int):
    # Checking if task exists
    task = get_task_by_id(task_id, hydrate=True)
    if not task:
        return 'Task not found', 404

    # Checking if user is part of team
    member = get_member(token_id, task['team_id'])
    if not member:
        return 'Unauthorized', 401

    return jsonify(task)

@tasks.delete('/tasks/<int:task_id>')
@token_required
def remove_task_route(task_id: int, token_id: int):
    # Checking if task exists
    task = get_task_by_id(task_id)
    if not task:
        return 'Task not found', 404

    # Checking if user is part of team
    member = get_member(token_id, task['team_id'])
    if not member:
        return 'Unauthorized', 401

    # Creating delete queries
    task_query = "DELETE FROM tasks WHERE id = %s"
    assignees_query = "DELETE FROM assignees WHERE task_id = %s"
    label_query = "DELETE FROM task_labels WHERE task_id = %s"
    values = (task_id,)

    # Deleting task
    database.delete(task_query, values)
    database.delete(assignees_query, values)
    database.delete(label_query, values)

    return jsonify({})

@tasks.patch('/tasks/<int:task_id>')
@token_required
def update_task_route(task_id: int, token_id: int):
    # Checking if task exists
    task = get_task_by_id(task_id)
    if not task:
        return 'Task not found', 404
    current_block_id = task['block_id']
    current_position = task['position']

    # Checking if user is part of team
    member = get_member(token_id, task['team_id'])
    if not member:
        return 'Unauthorized', 401

    # Deciding what properties should update
    keys = []
    values = ()
    for key, value in request.form.items():
        # Making sure user can update property
        if key not in PATCH_TASK_ALLOWED_PROPERTIES: continue

        # Checking if key is title, and if title value is valid
        if key == 'title' and value == '':
            return 'Title may not be empty', 400

        # Appending values
        keys.append(key)
        values += (value,)

    # Checking if task changes block
    if 'block_id' in keys or 'position' in keys:
        if not 'block_id' in keys:
            return 'block_id is required with position argument'
        if not 'position' in keys:
            return 'position is required with block_id argument'
        
        # Checking if block exists
        block = get_block_by_id(request.form.get('block_id'))
        if not block:
            return 'Block not found', 404
        
        # Updating positions in new block
        position = int(request.form.get('position'))
        tasks = get_block_tasks(block['id'])
        for task in tasks:
            if task['position'] >= position:
                query = "UPDATE tasks SET position = %s WHERE id = %s"
                pos_values = (task['position'] + 1, task['id'])
                database.update(query, pos_values)

        # Updating positions in previous block
        tasks = get_block_tasks(current_block_id)
        for task in tasks:
            if task['id'] == task_id: continue
            if task['position'] >= current_position:
                query = "UPDATE tasks SET position = %s WHERE id = %s"
                pos_values = (task['position'] - 1, task['id'])
                database.update(query, pos_values)

    # If not properties are updated
    if not len(keys):
        return 'No properties to update were provided', 400

    # Creating update query
    keys_str = [f'{key} = %s' for key in keys]
    query = f"UPDATE tasks SET {','.join(keys_str)} WHERE id = %s"
    values += (task_id,)
    print(query, values)
    
    # Updating task properties
    database.update(query, values)

    # Fetching new task
    task = get_task_by_id(task_id)
    
    return jsonify(task)

@tasks.put('/tasks/<int:task_id>/assignees/<int:assignee_id>')
@token_required
def add_assignee_route(task_id: int, assignee_id: int, token_id: int):
    # Checking if task exists
    task = get_task_by_id(task_id)
    if not task:
        return 'Task not found', 404

    # Checking if user is part of team
    member = get_member(token_id, task['team_id'])
    if not member:
        return 'Unauthorized', 401

    # Checking if assignee is available
    assignee_member = get_member(assignee_id, task['team_id'])
    if not assignee_member:
        return 'Member not found', 404

    # Checking if assignee is already assigned task
    assignee = get_assignee(assignee_id, task_id)
    if assignee:
        return 'Member is already assigned this task', 409

    # Assigning member to task
    query = "INSERT INTO assignees (id, task_id, assigned_at) VALUES (%s, %s, %s)"
    values = (assignee_id, task_id, time())
    database.insert(query, values)

    # Fetching assignee
    created_assignee = get_assignee(assignee_id, task_id)

    return jsonify(created_assignee)

@tasks.delete('/tasks/<int:task_id>/assignees/<int:assignee_id>')
@token_required
def remove_assignee_route(task_id: int, assignee_id: int, token_id: int):
    # Checking if task exists
    task = get_task_by_id(task_id)
    if not task:
        return 'Task not found', 404

    # Checking if user is part of team
    member = get_member(token_id, task['team_id'])
    if not member:
        return 'Unauthorized', 401

    # Checking if assignee is available
    assignee_member = get_member(assignee_id, task['team_id'])
    if not assignee_member:
        return 'Member not found', 404

    # Checking if assignee is not already assigned task
    assignee = get_assignee(assignee_id, task_id)
    if not assignee:
        return 'Member is not assigned this task', 409

    # Unassigning assignee
    query = "DELETE FROM assignees WHERE id = %s AND task_id = %s"
    values = (assignee_id, task_id)
    database.delete(query, values)

    return jsonify({})

@tasks.get('/tasks/<int:task_id>/assignees')
@token_required
def get_task_assignees_route(task_id: int, token_id: int):
    # Checking if task exists
    task = get_task_by_id(task_id)
    if not task:
        return 'Task not found', 404

    # Checking if user is part of team
    member = get_member(token_id, task['team_id'])
    if not member:
        return 'Unauthorized', 401

    # Fetching assignees
    assignees = get_task_assignees(task_id)

    return jsonify(assignees)

@tasks.put('/tasks/<int:task_id>/labels/<int:label_id>')
@token_required
def add_task_label_route(task_id: int, label_id: int, token_id: int):
    # Checking if task exists
    task = get_task_by_id(task_id)
    if not task:
        return 'Task not found', 404

    # Checking if user is part of team
    member = get_member(token_id, task['team_id'])
    if not member:
        return 'Unauthorized', 401

    # Checking if label exists
    label = get_label_by_id(label_id)
    if not label:
        return 'Label not found', 404

    # Checking if label is already added
    task_label = get_task_label(label_id, task_id)
    if task_label:
        return 'Task already has this label', 400

    # Adding label to task
    query = "INSERT INTO task_labels (id, task_id, added_at) VALUES (%s, %s, %s)"
    values = (label_id, task_id, time())
    database.insert(query, values)

    return jsonify({}), 201

@tasks.delete('/tasks/<int:task_id>/labels/<int:label_id>')
@token_required
def remove_task_label_route(task_id: int, label_id: int, token_id: int):
     # Checking if task exists
    task = get_task_by_id(task_id)
    if not task:
        return 'Task not found', 404

    # Checking if user is part of team
    member = get_member(token_id, task['team_id'])
    if not member:
        return 'Unauthorized', 401

    # Checking if label exists
    label = get_label_by_id(label_id)
    if not label:
        return 'Label not found', 404

    # Checking if task has label
    task_label = get_task_label(label_id, task_id)
    if not task_label:
        return 'Task does not have this label', 400

    # Removing label from task
    query = "DELETE FROM task_labels WHERE id = %s AND task_id = %s"
    values = (label_id, task_id)
    database.delete(query, values)

    return jsonify({})