from flask import Blueprint, request, jsonify
from utils.common import get_task_by_id, get_member, get_assignee
from utils.auth import token_required
from database import database
from time import time


tasks = Blueprint('tasks', __name__)

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