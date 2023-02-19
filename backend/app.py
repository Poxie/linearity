from flask import Flask
from blueprints.users import users

app = Flask(__name__)

app.register_blueprint(users)

if __name__ == '__init__':
    app.run('127.0.0.1', port=6000)