from flask import request, jsonify
from functools import wraps
import jwt
import json
from datetime import datetime, timedelta

LOCATION = 'authentication/key.json'

def write_key(key: str, location: str = LOCATION) -> None:
    """
    Writes new key for API
    key: New secret key to be used when encrypting
    location: file path to json file to store key
    return: None, stores new key in key.json
    """
    key = {
        'key': key
    }
    with open(location, 'w') as json_file:
        json.dump(key, json_file, indent=4)


def read_key(location: str = LOCATION) -> str:
    """
    return: API key to use for encrypting
    location: file path to json file where key is stored
    """
    with open(location, 'r') as json_file:
        data = json.load(json_file)
    return data['key']


def token_required(func):
    """
    Decorator to use for endpoints that require a token

    How to use:
    @app.route('/...', methods=['...'])
    @token_required()
    def func(user_id, ..., ...):
        ...
    request: HTTP request with token as a header
    """
    @wraps(func)
    def decorated_function(*args, **kwargs):
        token_status = validate_token(request)
        try:
            user_id = token_status['user_id']
            request.user_id = user_id
            return func(*args, **kwargs)
        except Exception as e:
            return token_status
        
    return decorated_function  


def validate_token(request) -> dict:
    """
    Validates token from HTTP request
    request: HTTP request
    returns: int, user_id IF token is valid ELSE JSON response, message
    """
    token = request.headers.get('Authorization', 'NONE')
    
    if not token or not token.startswith('Bearer '):
        return jsonify({'user_id': -1, 'message': 'Token is missing'}), 401
    token = token.replace('Bearer ', '')

    try:
        payload = jwt.decode(token, read_key(), algorithms=['HS256'])
        return {'user_id': payload.get('user_id'), 'message': 'Token authorized'}
    except jwt.ExpiredSignatureError:
        return jsonify({'user_id': -1, 'message': 'Token has expired'}), 401
    except jwt.DecodeError:
        return jsonify({'user_id': -1, 'message': 'Invalid token'}), 401

 
def generate_token(user_id: int, time: int = 60, key_location: str = LOCATION) -> str:
    """
    Generates token for client
    user_id: user_id in database
    time: duration the token should be valid for in minutes, default 60
    key_location: file path to json file where key is stored
    returns: str, token
    """
    expires = datetime.utcnow() + timedelta(minutes=60)
    payload = {
        'user_id': user_id,
        'expires': expires.isoformat()
    }
    token = jwt.encode(payload, read_key(key_location), algorithm='HS256')
    return token


if __name__ == '__main__':
    write_key()
