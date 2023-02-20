from flask import Blueprint, request, jsonify
from utils.auth import token_required
from utils.common import create_id, get_group_by_id, get_member, get_block_by_id
from database import database
from time import time

groups = Blueprint('groups', __name__)

@groups.post('/groups/<int:group_id>/blocks')
@token_required
def create_group_block_route(group_id: int, token_id: int):
    # Checking if group exists
    group = get_group_by_id(group_id)
    if not group:
        return 'Group not found', 404

    # Checking if user is part of team
    member = get_member(token_id, group['team_id'])
    if not member:
        return 'Unauthorized', 401

    # Getting request arguments
    form = request.form
    name = form.get('name')
    description = form.get('description')

    # Checking if name is present
    if not name:
        return 'Name is a required argument', 400

    # Getting position of block based on current block count
    count_query = "SELECT COUNT(*) AS block_count FROM blocks WHERE group_id = %s"
    count_values = (group_id,)

    data = database.fetch_one(count_query, count_values)
    position = data['block_count']

    # Creating block
    id = create_id('blocks')
    query = "INSERT INTO blocks (id, group_id, name, description, position, created_at) VALUES (%s, %s, %s, %s, %s, %s)"
    values = (id, group_id, name, description, position, time())
    database.insert(query, values)

    # Fetching created block
    block = get_block_by_id(id)

    return jsonify(block)