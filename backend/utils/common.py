from utils.constants import ID_LENGTH
from utils.abstracts import User, Team, Member, Group
from database import database
from random import randrange
from typing import Union

def create_id(table: str) -> int:
    # Creating id
    id_parts = []
    opts = '0123456789'
    for i in range(ID_LENGTH):
        id_parts.append(opts[randrange(0, len(opts))])
    
    id = int(''.join(id_parts))

    # Checking if id is unique
    user = database.fetch_one(
        f"SELECT id FROM {table} WHERE id = %s",
        (id,)
    )
    if user:
        return create_id()

    return id

def get_user_by_id(id: int) -> Union[None, User]:
    query = "SELECT * FROM users WHERE id = %s"
    values = (id,)

    user = database.fetch_one(query, values)
    if user:
        del user['password']

    return user

def get_team_by_id(id: int) -> Union[None, Team]:
    query = "SELECT * FROM teams WHERE id = %s"
    values = (id,)

    team = database.fetch_one(query, values)
    
    return team

def get_group_by_id(id: int) -> Union[None, Group]:
    query = "SELECT * FROM groups WHERE id = %s"
    values = (id,)

    group = database.fetch_one(query, values)

    return group

def get_member(id: int, team_íd: int) -> Union[None, Member]:
    query = "SELECT * FROM members WHERE id = %s AND team_id = %s"
    values = (id, team_íd)

    member = database.fetch_one(query, values)

    return member