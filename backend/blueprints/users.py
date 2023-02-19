from flask import Blueprint, jsonify
from database import database

users = Blueprint('users', __name__)

@users.get('/users/<int:user_id>')
def get_user_route(user_id: int):
    connection, cursor = database.connection()

    cursor.execute('SELECT * FROM users')
    for user in cursor:
        print(user)

    return jsonify({ 'user_id': user_id })