from dataclasses import dataclass
from typing import Union, TypedDict

class User(TypedDict):
    id: int
    username: str
    email: Union[None, str]
    avatar: Union[None, str]
    created_at: int