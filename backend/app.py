import os
from flask import Flask
from flask_cors import CORS
from blueprints.users import users
from blueprints.teams import teams
from blueprints.groups import groups
from blueprints.blocks import blocks
from blueprints.tasks import tasks

app = Flask(__name__)

CORS(app, resources={r'/*': {'origins': os.getenv('FRONTEND_ORIGIN')}})

app.register_blueprint(users)
app.register_blueprint(teams)
app.register_blueprint(groups)
app.register_blueprint(blocks)
app.register_blueprint(tasks)

if __name__ == '__init__':
    app.run('127.0.0.1', port=6000)