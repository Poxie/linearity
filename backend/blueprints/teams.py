from flask import Blueprint, request, jsonify
from utils.auth import token_required
from utils.common import create_id, get_team_by_id, get_user_by_id, get_member, get_label_by_id, get_group_by_id, get_task_by_id
from utils.constants import PATCH_TEAM_ALLOWED_PROPERTIES, PATCH_LABEL_ALLOWED_PROPERTIES
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

@teams.get('/teams/<int:team_id>')
@token_required
def get_team_route(team_id: int, token_id: int):
    # Checking if team exists
    team = get_team_by_id(team_id)
    if not team:
        return 'Team not found', 404

    # Checking if user is part of team
    member = get_member(token_id, team_id)
    if not member:
        return 'Unauthorized', 401

    return jsonify(team)

@teams.get('/teams/<int:team_id>/members')
@token_required
def get_team_members_route(team_id: int, token_id: int):
    team = get_team_by_id(team_id)
    # Checking if team exists
    if not team:
        return 'Team not found', 404

    # Checking if user is part of team
    member = get_member(token_id, team_id)
    if not member:
        return 'Unauthorized', 401
    
    # Getting team members
    query = """
    SELECT
        m.*,
        u.*
    FROM members m
        LEFT JOIN users u ON u.id = m.id
    WHERE
        m.team_id = %s
    GROUP BY
        u.id
    """
    members = database.fetch_many(query, (team_id, ))
    if members:
        for member in members:
            del member['password']
            del member['email']

    return jsonify(members)

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

@teams.post('/teams/<int:team_id>/labels')
@token_required
def add_team_label_route(team_id: int, token_id: int):
    # Checking if team exists
    team = get_team_by_id(team_id)
    if not team:
        return 'Team not found', 404

    # Checking if user is part of team
    member = get_member(token_id, team_id)
    if not member:
        return 'Unauthorized', 401

    # Fetching label information
    form = request.form
    name = form.get('name')
    color = form.get('color')

    # Checking if name is presnet
    if not name:
        return 'Name is a required argument', 400

    # Creating label
    id = create_id('labels')
    query = "INSERT INTO labels (id, team_id, name, color, created_at) VALUES (%s, %s, %s, %s, %s)"
    values = (id, team_id, name, color, time())
    database.insert(query, values)

    # Fetching created label
    label = get_label_by_id(id)

    return jsonify(label)

@teams.get('/teams/<int:team_id>/labels')
@token_required
def get_team_labels_route(team_id: int, token_id: int):
    # Checking if team exists
    team = get_team_by_id(team_id)
    if not team:
        return 'Team not found', 404

    # Checking if user is part of team
    member = get_member(token_id, team_id)
    if not member:
        return 'Unauthorized', 401

    # Fetching labels
    query = """
    SELECT
        l.*,
        COUNT(DISTINCT tl.task_id) AS task_count
    FROM labels l
        LEFT JOIN task_labels tl ON tl.id = l.id
    WHERE
        l.team_id = %s
    GROUP BY
        l.id
    """
    values = (team_id,)
    labels = database.fetch_many(query, values)

    return jsonify(labels)

@teams.delete('/labels/<int:label_id>')
@token_required
def delete_label_route(label_id: int, token_id: int):
    # Checking if label exists
    label = get_label_by_id(label_id)
    if not label:
        return 'Label not found', 404
    
    # Checking if team exists
    team = get_team_by_id(label['team_id'])
    if not team:
        return 'Team not found', 404

    # Checking if user is part of team
    member = get_member(token_id, label['team_id'])
    if not member:
        return 'Unauthorized', 401
    
    # Deleting label
    query = "DELETE FROM labels WHERE id = %s"
    task_label_query = "DELTE FROM task_labels WHERE id = %s"
    
    values = (label_id,)
    database.delete(query, values)

    return jsonify({})

@teams.patch('/labels/<int:label_id>')
@token_required
def update_label_route(label_id: int, token_id: int):
    # Checking if label exists
    label = get_label_by_id(label_id)
    if not label:
        return 'Label not found', 404
    
    # Checking if team exists
    team = get_team_by_id(label['team_id'])
    if not team:
        return 'Team not found', 404

    # Checking if user is part of team
    member = get_member(token_id, label['team_id'])
    if not member:
        return 'Unauthorized', 401
    
    # Deciding what properties should update
    keys = []
    values = ()
    for key, value in request.form.items():
        # Making sure user can update property
        if key not in PATCH_LABEL_ALLOWED_PROPERTIES: continue

        # Checking if key is name
        if key == 'name' and value == '':
            return 'Name may not be empty', 400

        # Appending values
        keys.append(key)
        values += (value,)

    # If not properties are updated
    if not len(keys):
        return 'No properties to update were provided', 400

    # Creating update query
    keys_str = [f'{key} = %s' for key in keys]
    query = f"UPDATE labels SET {','.join(keys_str)} WHERE id = %s"
    values += (label_id,)
    
    # Updating team properties
    database.update(query, values)

    # Fetching updated label
    label = get_label_by_id(label_id)

    return jsonify(label)

@teams.get('/labels/<int:label_id>/tasks')
@token_required
def get_label_tasks_route(label_id: int, token_id: int):
    # Checking if label exists
    label = get_label_by_id(label_id)
    if not label:
        return 'Label not found', 404
    
    # Checking if team exists
    team = get_team_by_id(label['team_id'])
    if not team:
        return 'Team not found', 404

    # Checking if user is part of team
    member = get_member(token_id, label['team_id'])
    if not member:
        return 'Unauthorized', 401
    
    # Fetching tasks with label
    query = "SELECT task_id FROM task_labels WHERE id = %s"
    values = (label_id,)
    items = database.fetch_many(query, values)

    # Fetchomg tasls
    tasks = [get_task_by_id(item['task_id'], hydrate=True) for item in items]

    return jsonify(tasks)