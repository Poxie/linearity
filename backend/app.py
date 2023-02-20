from flask import Flask
from blueprints.users import users
from blueprints.teams import teams
from blueprints.groups import groups

app = Flask(__name__)

app.register_blueprint(users)
app.register_blueprint(teams)
app.register_blueprint(groups)

if __name__ == '__init__':
    app.run('127.0.0.1', port=6000)