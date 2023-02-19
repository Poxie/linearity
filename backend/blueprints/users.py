from flask import Blueprint, jsonify

users = Blueprint('users', __name__)

@users.get('/users/<int:user_id>')
def get_user_route(user_id: int):
    return jsonify({ 'user_id': user_id })