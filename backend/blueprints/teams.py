from flask import Blueprint, request, jsonify
from utils.auth import token_required
from utils.common import create_id, get_team_by_id, get_user_by_id, get_member, get_group_by_id
from utils.constants import PATCH_TEAM_ALLOWED_PROPERTIES
from database import database
from time import time

teams = Blueprint('teams', __name__)

@teams.post('/teams')
@token_required
def create_team_route(token_id: int):
    form = request.form
    name = form.get('name')
    description = form.get('description')
    icon = form.get('icon')

    # Making sure name is present
    if not name:
        return 'Name is a required argument', 400

    # Creating team
    id = create_id('teams')
    query = "INSERT INTO teams (id, owner_id, name, description, icon, created_at) VALUES (%s, %s, %s, %s, %s, %s)"
    values = (id, token_id, name, description, icon, time())
    database.insert(query, values)

    # Creating owner member
    member_query = "INSERT INTO members (id, team_id, joined_at) VALUES (%s, %s, %s)"
    member_values = (token_id, id, time())
    database.insert(member_query, member_values)

    # Fetching created team
    team = get_team_by_id(id)

    return jsonify(team)

@teams.patch('/teams/<int:team_id>')
@token_required
def update_team_route(team_id: int, token_id: int):
    # Checking if team exists
    team = get_team_by_id(team_id)
    if not team:
        return 'Team not found', 404

    # For now, only owners are allowed to update teams
    # Add permissions to team members later
    if team['owner_id'] != token_id:
        return 'Unauthorized', 401

    # Deciding what properties should update
    keys = []
    values = ()
    for key, value in request.form.items():
        # Making sure user can update property
        if key not in PATCH_TEAM_ALLOWED_PROPERTIES: continue

        # Appending values
        keys.append(key)
        values += (value,)

    # If not properties are updated
    if not len(keys):
        return 'No properties to update were provided', 400

    # Creating update query
    keys_str = [f'{key} = %s' for key in keys]
    query = f"UPDATE teams SET {','.join(keys_str)} WHERE id = %s"
    values += (team_id,)
    
    # Updating team properties
    database.update(query, values)

    # Fetching updated team
    team = get_team_by_id(team_id)

    return jsonify(team)

# TODO: make sure only members of the team can fetch the team
@teams.get('/teams/<int:team_id>')
def get_team_route(team_id: int):
    team = get_team_by_id(team_id)
    if not team:
        return 'Team not found', 404

    return jsonify(team)


@teams.post('/teams/<int:team_id>/members/<int:user_id>')
@token_required
def add_member_to_team_route(team_id: int, user_id: int, token_id: int):
    team = get_team_by_id(team_id)

    # Checking if team exists
    if not team:
        return 'Team not found', 404

    # Checking if user has access to add member
    # Currently only owner is allowed, allow with member permissions later
    if token_id != team['owner_id']:
        return 'Unauthorized', 401

    # Checking if user exists
    user = get_user_by_id(user_id)
    if not user:
        return 'User not found', 404

    # Checking if member already exists
    member = get_member(user_id, team_id)
    if member:
        return 'User is already a member of this team', 409

    # Creating team member
    query = "INSERT INTO members (id, team_id, joined_at) VALUES (%s, %s, %s)"
    values = (user_id, team_id, time())
    database.insert(query, values)

    # Fetching created member
    member = get_member(user_id, team_id)

    return jsonify(member)

@teams.delete('/teams/<int:team_id>/members/<int:user_id>')
@token_required
def remove_member_from_team_route(team_id: int, user_id: int, token_id: int):
    team = get_team_by_id(team_id)

    # Checking if team exists
    if not team:
        return 'Team not found', 404

    # Checking if user has access to remove member
    # Currently only owner is allowed, allow with member permissions later
    if token_id != team['owner_id']:
        return 'Unauthorized', 401

    # Checking if user exists
    user = get_user_by_id(user_id)
    if not user:
        return 'User not found', 404

    # Checking if user is a member
    member = get_member(user_id, team_id)
    if not member:
        return 'User is not a member of this team', 409

    # Deleteing team member
    query = "DELETE FROM members WHERE id = %s AND team_id = %s"
    values = (user_id, team_id)
    database.delete(query, values)

    return jsonify({})


@teams.post('/teams/<int:team_id>/groups')
@token_required
def add_group_route(team_id: int, token_id: int):
    team = get_team_by_id(team_id)
    if not team:
        return 'Team not found', 404

    # Checking if user has access to create group
    # Currently only owner is allowed, allow with member permissions later
    if token_id != team['owner_id']:
        return 'Unauthorized', 401

    # Getting group attributes from form
    form = request.form
    name = form.get('name')
    description = form.get('description')

    # Checking if name is present
    if not name:
        return 'Name is a required argument', 400

    # Creating group
    id = create_id('groups')
    query = "INSERT INTO groups (id, team_id, name, description, created_at) VALUES (%s, %s, %s, %s, %s)"
    values = (id, team_id, name, description, time())
    database.insert(query, values)

    # Fetching created group
    group = get_group_by_id(id)

    return jsonify(group)

@teams.delete('/teams/<int:team_id>/groups/<int:group_id>')
@token_required
def delete_team_group_route(team_id: int, group_id: int, token_id: int):
    # Checking if team exists
    team = get_team_by_id(team_id)
    if not team:
        return 'Team not found', 404

    # Checking if group exists
    group = get_group_by_id(group_id)
    if not group:
        return 'Group not found', 404

    # Checking if user has permission to delete group
    # Currently only owner has access, but fix with member permissions later
    if team['owner_id'] != token_id:
        return 'Unauthorized', 401

    # Deleting group; make sure to delete data related to group as well in the future
    query = "DELETE FROM groups WHERE id = %s"
    values = (group_id,)
    database.delete(query, values)

    return jsonify({})

@teams.get('/teams/<int:team_id>/groups')
@token_required
def get_team_groups_route(team_id: int, token_id: int):
    # Checking if team exists
    team = get_team_by_id(team_id)
    if not team:
        return 'Team not found', 404

    # Checking if user is part of team
    member = get_member(token_id, team_id)
    if not member:
        return 'Unauthorized', 401

    # Creating fetching query
    query = "SELECT * FROM groups WHERE team_id = %s"
    values = (team_id,)
    
    # Fetching groups
    groups = database.fetch_many(query, values)

    return jsonify(groups)