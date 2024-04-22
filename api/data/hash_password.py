import hashlib

def hash_password(password: str) -> str:
    """
    Deterministic password hashing function for a unique input to always generate the same result

    Args:
    password (str): unhashed password

    Returns:
    hashed_password (str)
    """
    if not password:
        return None

    salted_password = password + "=DZ3;M<B?P<K"

    hashed_value = hashlib.sha256(salted_password.encode('utf-8')).hexdigest()
    
    return hashed_value

if __name__ == "__main__":
    print(hash_password("hashed_password5"))