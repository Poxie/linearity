from flask import Blueprint, request, jsonify
from utils.auth import token_required
from utils.constants import PATCH_GROUP_ALLOWED_PROPERTIES
from utils.common import create_id, get_group_by_id, get_member, get_block_by_id, get_group_blocks, get_team_by_id, get_task_by_id
from database import database
from time import time
import json

groups = Blueprint('groups', __name__)

@groups.get('/groups/<int:group_id>')
@token_required
def get_team_group_route(group_id: int, token_id: int):
    # Checking if group exists
    group = get_group_by_id(group_id)
    if not group:
        return 'Group not found', 404
    
    # Checking if user is part of team
    member = get_member(token_id, group['team_id'])
    if not member:
        return 'Unauthorized', 401

    return jsonify(group)

@groups.delete('/groups/<int:group_id>')
@token_required
def delete_team_group_route(group_id: int, token_id: int):
    # Checking if group exists
    group = get_group_by_id(group_id)
    if not group:
        return 'Group not found', 404
    
    # Checking if user is part of team
    member = get_member(token_id, group['team_id'])
    if not member:
        return 'Unauthorized', 401

    # Deleting group; make sure to delete data related to group as well in the future
    query = "DELETE FROM groups WHERE id = %s"
    values = (group_id,)
    database.delete(query, values)

    return jsonify({})

@groups.patch('/groups/<int:group_id>')
@token_required
def update_team_group_route(group_id: int, token_id: int):
    # Checking if group exists
    group = get_group_by_id(group_id)
    if not group:
        return 'Group not found', 404
    
    # Checking if user is part of team
    member = get_member(token_id, group['team_id'])
    if not member:
        return 'Unauthorized', 401

    # Deciding what properties should update
    keys = []
    values = ()
    for key, value in request.form.items():
        # Making sure user can update property
        if key not in PATCH_GROUP_ALLOWED_PROPERTIES: continue

        # Appending values
        keys.append(key)
        values += (value,)

    # If not properties are updated
    if not len(keys):
        return 'No properties to update were provided', 400

    # Creating update query
    keys_str = [f'{key} = %s' for key in keys]
    query = f"UPDATE groups SET {','.join(keys_str)} WHERE id = %s"
    values += (group_id,)
    
    # Updating team properties
    database.update(query, values)

    # Fetching updated group
    group = get_group_by_id(group_id)

    return jsonify(group)

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
    query = "INSERT INTO blocks (id, team_id, group_id, name, description, position, created_at) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    values = (id, group['team_id'], group_id, name, description, position, time())
    database.insert(query, values)

    # Fetching created block
    block = get_block_by_id(id)

    return jsonify(block)

@groups.get('/groups/<int:group_id>/blocks')
@token_required
def get_group_blocks_route(group_id: int, token_id: int):
    # Checking if group exists
    group = get_group_by_id(group_id)
    if not group:
        return 'Group not found', 404

    # Checking if user is part of team
    member = get_member(token_id, group['team_id'])
    if not member:
        return 'Unauthorized', 401

    # Fetching blocks
    query = "SELECT * FROM blocks WHERE group_id = %s"
    values = (group_id,)
    blocks = database.fetch_many(query, values)

    return jsonify(blocks)

@groups.patch('/groups/<int:group_id>/blocks')
@token_required
def update_group_blocks_route(group_id: int, token_id: int):
    # Checking if block exists
    block = get_group_by_id(group_id)
    if not block:
        return 'Block not found', 404

    # Checking if user is part of team
    member = get_member(token_id, block['team_id'])
    if not member:
        return 'Unauthorized', 401

    # Getting blocks to update
    # Will be formated like [{position: 0, id: block_id_one}, {position: 1, id: block_id_two}]
    # Which updates the position of these blocks
    blocks = request.form.get('blocks')

    # Checking if blocks are present
    if not blocks:
        return 'Blocks is a required argument', 400

    # Attempting to load blocks list from string
    try:
        blocks = json.loads(blocks)
    except Exception as e:
        return 'Blocks list is malformed', 400

    # Deciding how to update task position
    keys = []
    for block in blocks:
        # Making sure position and id are present
        if 'position' not in block or 'id' not in block:
            return 'Position or id is missing in block', 400

        # Checking if position and id are numbers
        if not isinstance(block['position'], int) or not isinstance(block['id'], int):
            return 'Position and id must be a number', 400

        keys.append([block['id'], block['position']])

    # Updating block positions
    for key in keys:
        query = "UPDATE blocks SET position = %s WHERE id = %s"
        values = (key[1], key[0])
        database.update(query, values)

    # Fetching new blocks
    blocks = get_group_blocks(group_id)

    return jsonify(blocks)