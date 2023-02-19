import os, mysql.connector
from mysql.connector.errors import DatabaseError
from mysql.connector import pooling
from mysql.connector.pooling import MySQLConnectionPool, PooledMySQLConnection
from mysql.connector.cursor import MySQLCursor
from typing import Tuple, Union

MYSQL_DATABASE = os.getenv('MYSQL_DATABASE')
db_config = {
    'host': os.getenv('MYSQL_HOST'),
    'user': os.getenv('MYSQL_USER'),
    'password': os.getenv('MYSQL_PASSWORD'),
    'database': os.getenv('MYSQL_DATABASE')
}

POOL_SIZE = 10
POOL_RESET_SESSION = True
class Database():
    def __init__(self):
        self.pool = self.__create_connection()

    def __create_connection(self) -> MySQLConnectionPool:
        try:
            return pooling.MySQLConnectionPool(
                pool_name='pynative_pool',
                pool_size=POOL_SIZE,
                pool_reset_session=POOL_RESET_SESSION,
                **db_config
            )
        except DatabaseError as e:
            # Database does not exist
            db = mysql.connector.connect(
                host=db_config['host'],
                user=db_config['user'],
                passwd=db_config['password']
            )

            cursor = db.cursor()

            # Creating database
            cursor.execute(f'CREATE DATABASE IF NOT EXISTS {MYSQL_DATABASE}')
            cursor.execute(F'USE {MYSQL_DATABASE}')

            # Creating database tables
            cursor.execute(f'CREATE TABLE IF NOT EXISTS users (id BIGINT(20), username VARCHAR(255), password VARCHAR(255), email VARCHAR(255) DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, avatar VARCHAR(255) DEFAULT NULL, created_at BIGINT(20))')

            return self.__create_connection()

    def connection(self) -> Tuple[PooledMySQLConnection, MySQLCursor]:
        connection = self.pool.get_connection()
        cursor = connection._cnx.cursor(dictionary=True, buffered=True)
        return connection, cursor

    def fetch_one(self, query: str, values: Tuple[Union[str, int]]):
        connection, cursor = self.connection()

        data = None
        cursor.execute(query, values)
        
        if cursor.with_rows:
            data = cursor.fetchone()

        connection.close()
        cursor.close()
        return data

    def fetch_many(self, query: str, values: Tuple[Union[str, int]]):
        connection, cursor = self.connection()

        data = None
        cursor.execute(query, values)
        
        if cursor.with_rows:
            data = cursor.fetchmany()

        connection.close()
        cursor.close()
        return data

    def insert(self, query: str, values: Tuple[Union[str, int]]):
        connection, cursor = self.connection()

        data = None
        cursor.execute(query, values)
        
        id = cursor.lastrowid

        connection._cnx.commit()
        connection.close()
        cursor.close()
        return id

    def update(self, query: str, values: Tuple[Union[str, int]]):
        connection, cursor = self.connection()

        data = None
        cursor.execute(query, values)
        
        rowcount = cursor.rowcount

        connection._cnx.commit()
        connection.close()
        cursor.close()
        return rowcount

    def delete(self, query: str, values: Tuple[Union[str, int]]):
        connection, cursor = self.connection()

        data = None
        cursor.execute(query, values)
        
        id = cursor.lastrowid

        connection._cnx.commit()
        connection.close()
        cursor.close()
        return id

database = Database()