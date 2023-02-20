from flask import Blueprint, request, jsonify
from utils.auth import token_required
from utils.common import create_id, get_team_by_id
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