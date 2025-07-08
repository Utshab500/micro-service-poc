import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

class Connection:
    """
    This class handles MongoDB Connection
    
    @author Utshab Saha
    @email utshab500@gmail.com
    """
    def __init__(self, DB_HOST=None, DB_NAME=None):
        self.DB_HOST = DB_HOST or os.getenv('DB_HOST')
        self.DB_NAME = DB_NAME or os.getenv('DB_NAME')
        self._client = None
        print(self.DB_HOST)
        print(self.DB_NAME)

    def get_connection(self):
        """
        Returns: dict {status: bool, client: MongoClient}
        """
        try:
            self._client = MongoClient(self.DB_HOST)
            # Connect the client to the server and check connection
            db = self._client[self.DB_NAME]
            connect_check = db.command('ping')
            print(connect_check)
            status = False
            if not connect_check.get('ok'):
                raise ConnectionFailure("❌ Failed to connect to the database")
            else:
                status = True
                print("✅ Connected successfully to server")
            return {
                'status': status,
                'client': self._client
            }
        except Exception as e:
            print(f"Connection error: {e}")
            return {
                'status': False,
                'client': None
            }

    def close_connection(self):
        if self._client:
            self._client.close()
