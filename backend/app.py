from flask import Flask
from blueprints.users import users
from blueprints.teams import teams

app = Flask(__name__)

app.register_blueprint(users)
app.register_blueprint(teams)

if __name__ == '__init__':
    app.run('127.0.0.1', port=6000)