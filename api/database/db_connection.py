import psycopg2
from database.config import load_config

def connect_to_db(query = "SELECT * FROM users LIMIT 5;"):
    """
    Connect to a PostgreSQL database and execute a query.

    This function connects to a PostgreSQL database using configuration parameters 
    loaded from a configuration file. It executes a provided query and prints the 
    fetched results.

    Args:
    query (str): The SQL query to be executed.
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
        
        for row in rows:
            print(row)
            
    except Exception as e:
        print(f"An error occurred: {e}")
        
    finally:
        # Close the cursor and connection
        cur.close()
        conn.close()
        

if __name__ == "__main__":
    connect_to_db()
