from dataclasses import dataclass
from typing import Union, TypedDict, List

class User(TypedDict):
    id: int
    username: str
    email: Union[None, str]
    avatar: Union[None, str]
    created_at: int

class Team(TypedDict):
    id: int
    owner_id: int
    name: str
    description: Union[None, str]
    icon: Union[None, str]
    created_at: int

class Member(TypedDict):
    id: int
    team_id: int
    joined_at: int

class Group(TypedDict):
    id: int
    team_id: int
    name: str
    description: Union[None, str]
    created_at: int

class Block(TypedDict):
    id: int
    group_id: int
    team_id: int
    name: str
    description: Union[None, str]
    position: int
    created_at: int

class Label(TypedDict):
    id: int
    team_id: str
    name: str
    color: str

class Task(TypedDict):
    id: int
    block_id: int
    title: str
    description: Union[None, str]
    position: int
    created_at: int
    labels: List[Label]
    assignees: List[User]

class Assignee(TypedDict):
    id: int
    task_id: int
    assgined_at: int