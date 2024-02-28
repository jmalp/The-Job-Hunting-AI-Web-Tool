from flask import request, jsonify
from functools import wraps
import jwt
import json
from datetime import datetime, timedelta

LOCATION = 'authentication/key.json'

def write_key(key: str, location: str = LOCATION) -> None:
    """
    Writes new base key for token encrypting
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
    Reads base key for token encrypting
    location: str | file path to json file where key is stored
    return: str | Base key to use for encrypting
    """
    with open(location, 'r') as json_file:
        data = json.load(json_file)
    return data['key']


def token_required(func):
    """
    Decorator to use for endpoints that require a token

    This function will have the API return an error on an invalid token.

    Otherwise, it will extract the user_id from the token, which should be
    the first parameter in the function

    How to use:
        @app.route('/...', methods=['...'])

        @token_required()

        def func(user_id, ..., ...):
        
            ...
    """
    @wraps(func)
    def decorated_function(*args, **kwargs):
        # Extract token from headers
        token = request.headers.get('Authorization', 'NONE')
        token_status = validate_token(token)

        try:
            user_id = token_status['user_id']
            # ERROR if validate_token returned a user_id of -1
            if user_id == -1:
                return jsonify(token_status), 401

            # Call endpoint function with user_id as first parameter
            return func(user_id, *args, **kwargs)

        # Return error message on exception
        except Exception as e:
            return jsonify({"error": e}), 401
        
    return decorated_function  


def validate_token(token: str = '') -> dict:
    """
    Validates token from HTTP request
    token: str | JWT string received in HTTP request headers
        This can be extracted from the HTTP request through the function: request.headers.get('Authorization', 'NONE')
    returns: dict
        {
            'user_id': int | user_id in database, -1 if invalid token
            'message': str | error/success message
        }
    """

    # ERROR If parameter is missing or token is not in correct format
    if not token or not token.startswith('Bearer '):
        return {'user_id': -1, 'message': 'Token is missing'}
    token = token.replace('Bearer ', '')

    # Extract payload which contains user_id and expiration_time
    try:
        payload = jwt.decode(token, read_key(), algorithms=['HS256'])
        user_id = payload.get('user_id')
        expiration_time = datetime.strptime(payload.get('expires'), "%Y-%m-%dT%H:%M:%S.%f")

    # ERROR if token wasn't able to be decoded
    except jwt.DecodeError:
        return {'user_id': -1, 'message': 'Invalid token'}
    
    # ERROR if current time is later than expiration time
    if datetime.utcnow() > expiration_time:
        # Set user_id = 1 to signify an error
        user_id = -1
        message = 'Token has expired'
    else:
        # Return everything as normal
        message = 'Token authorized'

    return {'user_id': user_id, 'message': message}

 
def generate_token(user_id: int, time: int = 60, key_location: str = LOCATION) -> str:
    """
    Generates token for client
    user_id: user_id in database
    time: duration the token should be valid for in minutes, default 60
    key_location: file path to json file where key is stored
    returns: str, token
    """
    # Token will expire after 'time' minutes
    expires = datetime.utcnow() + timedelta(minutes=time)
    payload = {
        'user_id': user_id,
        'expires': expires.isoformat()
    }

    # Create JWT using user_id, time key expires, base key, and encoding algorithm
    token = jwt.encode(payload, read_key(key_location), algorithm='HS256')

    # Log token generation in console
    print(f"token generated at UTC{datetime.utcnow()}... will expire UTC{expires}")

    return token


if __name__ == '__main__':
    write_key()
