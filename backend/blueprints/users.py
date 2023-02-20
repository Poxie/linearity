import os, jwt
from flask import Blueprint, jsonify, request
from database import database
from utils.common import create_id, get_user_by_id
from utils.auth import token_required
from utils.constants import PATCH_USER_ALLOWED_PROPERTIES
from time import time
from cryptography.fernet import Fernet
f = Fernet(os.getenv('CRYPTOGRAPHY_KEY'))

users = Blueprint('users', __name__)

JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
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

    # Encrypting password
    encrypted_password = f.encrypt(password.encode('utf-8'))

    # Creating user
    id = create_id('users')
    query = "INSERT INTO users (id, username, password, name, email, created_at) VALUES (%s, %s, %s, %s, %s, %s)"
    values = (id, username, encrypted_password, name, email, int(time()))

    database.insert(query, values)
    
    # Creating token for user
    token = jwt.encode({ 'id': id }, JWT_SECRET_KEY)

    return jsonify({ 'token': token })

@users.patch('/users/<int:user_id>')
@token_required
def update_user_route(user_id: int, token_id: int):
    print(user_id, token_id)
    # Making sure user is authorized
    if user_id != token_id:
        return 'Unauthorized', 401

    # Getting user properties to update
    args = request.args
    
    # Deciding what properties should update
    keys = []
    values = ()
    for key, value in args.items():
        # Making sure user can update property
        if key not in PATCH_USER_ALLOWED_PROPERTIES: continue

        # Appending values
        keys.append(key)
        values += (value,)

    # If not properties are updated
    if not len(keys):
        return 'No properties to update were provided', 400

    # Creating update query
    keys_str = [f'{key} = %s' for key in keys]
    query = f"UPDATE users SET {','.join(keys_str)} WHERE id = %s"
    values += (token_id,)
    
    # Updating user properties
    database.update(query, values)

    # Fetching user with new properties
    user = get_user_by_id(token_id)

    return jsonify(user)

@users.get('/users/<int:user_id>')
def get_user_route(user_id: int):
    connection, cursor = database.connection()

    cursor.execute('SELECT * FROM users')
    for user in cursor:
        print(user)

    return jsonify({ 'user_id': user_id })