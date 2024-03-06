import psycopg2
from database.config import load_config

def read_db(query: str = "SELECT * FROM users LIMIT 5;") -> list:
    """
    Connect to a PostgreSQL database and execute a SELECT query.

    This function connects to a PostgreSQL database using configuration parameters 
    loaded from a configuration file. It executes a provided query and prints the 
    fetched results.

    Args:
    query (str): The SQL query to be executed.

    Returns:
    result (list): list of rows represented by tuples
    """
    # Connecting to the PostgreSQL database
    conn = psycopg2.connect(**load_config())

    # Create a cursor object
    cur = conn.cursor()

    try:
        # Execute the query
        cur.execute(query)
        
        # Fetch the results
        rows = cur.fetchall()

        return rows
            
    except Exception as e:
        print(f"An error occurred: {e}")
        
    finally:
        # Close the cursor and connection
        cur.close()
        conn.close()


def update_db(query: str) -> str:
    """
    Connect to a PostgreSQL database and execute an INSERT, UPDATE, or DELETE query.

    This function connects to a PostgreSQL database using configuration parameters 
    loaded from a configuration file. It executes a provided query and prints the 
    fetched results.

    Args:
    query (str): The SQL query to be executed.

    Returns:
    str (message): success/error message
    """
    # Connecting to the PostgreSQL database
    conn = psycopg2.connect(**load_config())

    # Create a cursor object
    cur = conn.cursor()

    try:
        # Execute the query
        cur.execute(query)
        
        # Save query
        conn.commit()

        return "Database successfully updated"
            
    except Exception as e:
        return f"An error occurred: {e}"
        
    finally:
        # Close the cursor and connection
        cur.close()
        conn.close()


if __name__ == "__main__":
    read_db()
