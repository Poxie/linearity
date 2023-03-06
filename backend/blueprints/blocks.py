from flask import Blueprint, request, jsonify
from utils.auth import token_required
from utils.common import create_id, get_block_by_id, get_member, get_task_by_id, get_block_tasks
from utils.constants import PATCH_BLOCK_ALLOWED_PROPERTIES
from database import database
from time import time
import json

blocks = Blueprint('blocks', __name__)

@blocks.get('/blocks/<int:block_id>')
@token_required
def get_block_route(block_id: int, token_id: int):
    # Checking if block exists
    block = get_block_by_id(block_id, hydrate=True)
    if not block:
        return 'Block not found', 404

    # Checking if user is part of team
    member = get_member(token_id, block['team_id'])
    if not member:
        return 'Unauthorized', 401

    return jsonify(block)

@blocks.patch('/blocks/<int:block_id>')
@token_required
def update_block_route(block_id: int, token_id: int):
    # Checking if block exists
    block = get_block_by_id(block_id, hydrate=True)
    if not block:
        return 'Block not found', 404

    # Checking if user is part of team
    member = get_member(token_id, block['team_id'])
    if not member:
        return 'Unauthorized', 401
    
    # Deciding what properties should update
    keys = []
    values = ()
    for key, value in request.form.items():
        # Making sure user can update property
        if key not in PATCH_BLOCK_ALLOWED_PROPERTIES: continue

        # Checking if key is name, and if name value is valid
        if key == 'name' and value == '':
            return 'name may not be empty', 400

        # Appending values
        keys.append(key)
        values += (value,)

    # If not properties are updated
    if not len(keys):
        return 'No properties to update were provided', 400

    # Creating update query
    keys_str = [f'{key} = %s' for key in keys]
    query = f"UPDATE blocks SET {','.join(keys_str)} WHERE id = %s"
    values += (block_id,)
    
    # Updating block properties
    database.update(query, values)

    # Fetching updated block
    block = get_block_by_id(block_id, hydrate=True)

    return jsonify(block)

@blocks.delete('/blocks/<int:block_id>')
@token_required
def remove_block_route(block_id: int, token_id: int):
    # Checking if block exists
    block = get_block_by_id(block_id)
    if not block:
        return 'Block not found', 404

    # Checking if user is part of team
    member = get_member(token_id, block['team_id'])
    if not member:
        return 'Unauthorized', 401

    # Creating global query value
    values = (block_id,)

    # Fetching tasks related to block
    task_query = "SELECT id FROM tasks WHERE block_id = %s"
    task_rows = database.fetch_many(task_query, values)
    task_ids = [task_row['id'] for task_row in task_rows]

    # Creating delete query for block's tasks
    where_clause = ' or '.join([f'task_id = {task_id}' for task_id in task_ids])
    assignee_query = f"DELETE FROM assignees WHERE {where_clause}"
    label_query = f"DELETE FROM task_labels WHERE {where_clause}"

    # Creating block and task delete queries
    block_query = "DELETE FROM blocks WHERE id = %s"
    task_query = "DELETE FROM tasks WHERE block_id = %s"

    # Deleting block and its related fields
    database.delete(assignee_query, ())
    database.delete(label_query, ())
    database.delete(block_query, values)
    database.delete(task_query, values)

    return jsonify({})

@blocks.post('/blocks/<int:block_id>/tasks')
@token_required
def add_group_task_route(block_id: int, token_id: int):
    # Checking if block exists
    block = get_block_by_id(block_id)
    if not block:
        return 'Block not found', 404

    # Checking if user is part of team
    member = get_member(token_id, block['team_id'])
    if not member:
        return 'Unauthorized', 401

    # Getting request data
    form = request.form
    title = form.get('title')
    description = form.get('description')
    assignees = form.get('assignees')
    labels = form.get('labels')
    due_at = form.get('due_at')
    
    # Checking if assinees is valid
    new_assignee_ids = []
    try:
        assignee_ids = json.loads(assignees)
        for id in assignee_ids:
            if isinstance(id, int):
                new_assignee_ids.append(id)
    except Exception as e:
        return 'Assignees list is malformed', 400
    
    # Checking if labels is valid
    new_label_ids = []
    try:
        label_ids = json.loads(labels)
        for id in label_ids:
            if isinstance(id, int):
                new_label_ids.append(id)
    except Exception as e:
        return 'Labels list is malformed', 400

    # Checking if title is present
    if not title:
        return 'Title is a required argument', 400

    # Getting position of task
    position_query = "SELECT COUNT(*) AS task_count FROM tasks WHERE block_id = %s"
    position_values = (block_id,)
    data = database.fetch_one(position_query, position_values)

    position = data['task_count']

    # Inserting task
    id = create_id('tasks')
    query = "INSERT INTO tasks (id, team_id, block_id, title, description, position, created_at, due_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
    values = (id, block['team_id'], block_id, title, description, position, time(), due_at)
    database.insert(query, values)

    # Inserting assignees
    if(len(new_assignee_ids) > 0):
        for assignee_id in new_assignee_ids:
            assignee_query = "INSERT INTO assignees (id, task_id, assigned_at) VALUES (%s, %s, %s)"
            database.insert(assignee_query, (assignee_id, id, time()))

    # Inserting labels
    if(len(new_label_ids) > 0):
        for label_id in new_label_ids:
            label_query = "INSERT INTO task_labels (id, task_id, added_at) VALUES (%s, %s, %s)"
            database.insert(label_query, (label_id, id, time()))

    # Fetching inserted task
    task = get_task_by_id(id, hydrate=True)

    return jsonify(task)

@blocks.patch('/blocks/<int:block_id>/tasks')
@token_required
def update_block_tasks_route(block_id: int, token_id: int):
    # Checking if block exists
    block = get_block_by_id(block_id)
    if not block:
        return 'Block not found', 404

    # Checking if user is part of team
    member = get_member(token_id, block['team_id'])
    if not member:
        return 'Unauthorized', 401

    # Getting tasks to update
    # Will be formated like [{position: 0, id: task_id_one}, {position: 1, id: task_id_two}]
    # Which updates the position of these tasks
    tasks = request.form.get('tasks')

    # Checking if tasks are present
    if not tasks:
        return 'Tasks is a required argument', 400

    # Attempting to load tasks list from string
    try:
        tasks = json.loads(tasks)
    except Exception as e:
        return 'Tasks list is malformed', 400

    # Deciding how to update task position
    keys = []
    for task in tasks:
        # Making sure position and id are present
        if 'position' not in task or 'id' not in task:
            return 'Position or id is missing in task', 400

        # Checking if position and id are numbers
        if not isinstance(task['position'], int) or not isinstance(task['id'], int):
            return 'Position and id must be a number', 400

        keys.append([task['id'], task['position']])

    # Updating task positions
    for key in keys:
        query = "UPDATE tasks SET position = %s WHERE id = %s"
        values = (key[1], key[0])
        database.update(query, values)

    # Fetching new tasks
    tasks = get_block_tasks(block_id)

    return jsonify(tasks)