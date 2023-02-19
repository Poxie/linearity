from flask import Blueprint, jsonify, request
from database import database
from utils.common import create_id
from time import time

users = Blueprint('users', __name__)

@users.post('/users')
def create_user_route():
    # Getting request arguments
    args = request.args
    username = args.get('username')
    password = args.get('password')
    name = args.get('name')
    email = args.get('email')

    # Checking if required arguments are present
    if not username:
        return 'Username is a required argument', 400
    if not password:
        return 'Password is a required argument', 400
    if not name:
        return 'Name is a required argument', 400

    # Checking if username already exists
    user = database.fetch_one(
        "SELECT * FROM users WHERE username = %s",
        (username,)
    )
    if user:
        return 'Username is unavailable', 409

    # Creating user
    id = create_id('users')
    query = "INSERT INTO users (id, username, password, name, email, created_at) VALUES (%s, %s, %s, %s, %s, %s)"
    values = (id, username, password, name, email, int(time()))

    database.insert(query, values)
    
    user = database.fetch_one(
        "SELECT * FROM users WHERE id = %s",
        (id,)
    )

    return jsonify(user)

@users.get('/users/<int:user_id>')
def get_user_route(user_id: int):
    connection, cursor = database.connection()

    cursor.execute('SELECT * FROM users')
    for user in cursor:
        print(user)

    return jsonify({ 'user_id': user_id })