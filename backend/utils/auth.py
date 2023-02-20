import jwt, os
from flask import request
from functools import wraps

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token_missing = 'Authorization token is missing', 401

        # Checking if token is missing
        if not 'Authorization' in request.headers:
            return token_missing

        authorization = request.headers.get('Authorization')
        if not authorization or len(authorization.split(' ')) < 2:
            return token_missing

        token = authorization.split(' ')[1]

        if not token: 
            return token_missing

        # Checking if token is valid
        try:
            data = jwt.decode(token, os.getenv('JWT_SECRET_KEY'), algorithms=['HS256'])
            kwargs['token_id'] = data['id']
                
        except Exception as e:
            print(e)
            return 'Authorization token is invalid', 401

        return f(*args, **kwargs)

    return decorator