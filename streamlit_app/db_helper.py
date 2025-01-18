import pymysql
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Retrieve MySQL credentials
MYSQL_HOST = os.getenv("MYSQL_HOST")
MYSQL_USER = os.getenv("MYSQL_USER")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD")
MYSQL_DATABASE = os.getenv("MYSQL_DATABASE")

# Establish MySQL connection
connection = pymysql.connect(
    host=MYSQL_HOST,
    user=MYSQL_USER,
    password=MYSQL_PASSWORD,
    database=MYSQL_DATABASE,
)


def execute_query(query, params=None):
    """Execute a query that modifies data (INSERT, UPDATE, DELETE)."""
    with connection.cursor() as cursor:
        cursor.execute(query, params)
        connection.commit()


def fetch_data(query):
    """Fetch data from the database (SELECT)."""
    with connection.cursor() as cursor:
        cursor.execute(query)
        return cursor.fetchall()
