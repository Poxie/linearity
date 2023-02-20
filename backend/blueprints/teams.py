from flask import Blueprint, request, jsonify
from utils.auth import token_required
from utils.common import create_id, get_team_by_id
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