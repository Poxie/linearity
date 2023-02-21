from flask import Blueprint, request, jsonify
from utils.auth import token_required
from utils.common import create_id, get_block_by_id, get_member, get_task_by_id
from database import database
from time import time

blocks = Blueprint('blocks', __name__)

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
    query = "INSERT INTO tasks (id, team_id, block_id, title, description, position, created_at) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    values = (id, block['team_id'], block_id, title, description, position, time())
    database.insert(query, values)

    # Fetching inserted task
    task = get_task_by_id(id)

    return jsonify(task)

@blocks.get('/blocks/<int:block_id>/tasks')
@token_required
def get_block_tasks_route(block_id: int, token_id: int):
    # Checking if block exists
    block = get_block_by_id(block_id)
    if not block:
        return 'Block not found', 404

    # Checking if user is part of team
    member = get_member(token_id, block['team_id'])
    if not member:
        return 'Unauthorized', 401

    # Fetching task ids
    query = "SELECT id FROM tasks WHERE block_id = %s"
    values = (block_id,)
    task_ids = database.fetch_many(query, values)

    # Fetching task specific data
    tasks = []
    for task_id in task_ids:
        task = get_task_by_id(task_id['id'])
        if task:
            tasks.append(task)
    
    return jsonify(tasks)

@blocks.get('/blocks/<int:block_id>/tasks/<int:task_id>')
@token_required
def get_group_task_route(block_id: int, task_id: int, token_id: int):
    # Checking if block exists
    block = get_block_by_id(block_id)
    if not block:
        return 'Block not found', 404

    # Checking if user is part of team
    member = get_member(token_id, block['team_id'])
    if not member:
        return 'Unauthorized', 401

    # Checking if t ask exists
    task = get_task_by_id(task_id)
    if not task:
        return 'Task not found', 404

    return jsonify(task)