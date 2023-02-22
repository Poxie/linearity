from utils.constants import ID_LENGTH
from utils.abstracts import User, Team, Member, Group, Block, Task, Assignee, Label, TaskLabel
from database import database
from random import randrange
from typing import Union, List

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

def get_member(id: int, team_íd: int) -> Union[None, Member]:
    query = "SELECT * FROM members WHERE id = %s AND team_id = %s"
    values = (id, team_íd)

    member = database.fetch_one(query, values)

    return member

def get_group_by_id(id: int) -> Union[None, Group]:
    query = "SELECT * FROM groups WHERE id = %s"
    values = (id,)

    group = database.fetch_one(query, values)

    return group

def get_group_blocks(group_id: int) -> Union[None, List[Block]]:
    query = "SELECT * FROM blocks WHERE group_id = %s"
    values = (group_id,)

    blocks = database.fetch_many(query, values)

    return blocks

def get_block_by_id(id: int, hydrate=False) -> Union[None, Block]:
    query = "SELECT * FROM blocks WHERE id = %s"
    values = (id,)
    block = database.fetch_one(query, values)

    # Hydrating block
    if block and hydrate:
        task_query = "SELECT id FROM tasks WHERE block_id = %s"
        task_values = (id,)
        task_rows = database.fetch_many(task_query, task_values)

        # Hydrating block with hydrated tasks
        block['tasks'] = []
        for task_row in task_rows:
            task = get_task_by_id(task_row['id'], hydrate=True)
            if task:
                block['tasks'].append(task)

    return block

def get_block_tasks(block_id: int) -> Union[None, List[Task]]:
    # Fetching task ids
    query = "SELECT id FROM tasks WHERE block_id = %s"
    values = (block_id,)
    task_ids = database.fetch_many(query, values)

    # Fetching task specific data
    tasks = []
    for task_id in task_ids:
        task = get_task_by_id(task_id['id'], hydrate=True)
        if task:
            tasks.append(task)

    return tasks

def get_task_by_id(id: int, hydrate=False) -> Union[None, Task]:
    # Fetching task
    query = "SELECT * FROM tasks WHERE id = %s"
    values = (id,)
    task = database.fetch_one(query, values)

    # Hydrating task
    if hydrate and task:
        task['assignees'] = get_task_assignees(id)
        task['labels'] = get_task_labels(id)

    return task

def get_assignee(user_id: int, task_id: int) -> Union[None, Assignee]:
    query = "SELECT * FROM assignees WHERE id = %s AND task_id = %s"
    values = (user_id, task_id)

    assignee = database.fetch_one(query, values)

    return assignee

def get_task_assignees(task_id: int) -> Union[None, User]:
    query = """
    SELECT
        a.*,
        u.*
    FROM assignees a
        JOIN users u ON u.id = a.id
    WHERE
        a.task_id = %s
    GROUP BY
        a.id
    """
    values = (task_id,)

    # Fetching assignees
    assignees = database.fetch_many(query, values)
    
    # Making sure to remove confidential information
    for assignee in assignees:
        del assignee['password']

    return assignees

def get_label_by_id(label_id: int) -> Union[None, Label]:
    query = "SELECT * FROM labels WHERE id = %s"
    values = (label_id,)

    label = database.fetch_one(query, values)

    return label

def get_task_label(label_id: int, task_id: int) -> Union[None, TaskLabel]:
    query = "SELECT * FROM task_labels WHERE id = %s AND task_id = %s"
    values = (label_id, task_id)

    label = database.fetch_one(query, values)

    return label

def get_task_labels(task_id: int) -> Union[None, List[TaskLabel]]:
    query = """
    SELECT
        lt.*,
        l.*
    FROM task_labels lt
        JOIN labels l ON l.id = lt.id
    WHERE
        task_id = %s
    GROUP BY
        task_id
    """
    values = (task_id,)
    labels = database.fetch_many(query, values)

    return labels