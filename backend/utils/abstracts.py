from dataclasses import dataclass
from typing import Union, TypedDict

@dataclass
class User(TypedDict):
    id: int
    username: str
    email: Union[None, str]
    avatar: Union[None, str]
    created_at: int