from db.Connection import Connection
from models.User import User

def update_user(user_document: dict) -> bool:
    """
    Accepts a user document and updates it in the DB.
    If the user does not exist, it will be created (upsert).
    The user_document dictionary must contain an '_id' key for filtering.
    :param user_document: dict, a dictionary representing the user.
    :return: bool, True for success, False for failure.
    """
    con = Connection()
    try:
        # Create a User object and set its properties
        userObj = User()
        userObj.set_user(user_document, userObj)
        print(f"User object created: {userObj}")
        
        user_id = user_document.get('_id')
        if not user_id:
            print("Error: user_document must contain an '_id' key.")
            return False

        conn = con.get_connection()
        if not conn or not conn.get('status'):
            print("Failed to get DB connection.")
            # The Connection class already prints details.
            return False

        db = conn['client'][con.DB_NAME]
        user_collection = db["users"]

        # The filter to select the document to update
        filter_query = {"_id": user_id}

        # This is the equivalent of: const updateDoc = { $set: userDocument };
        update_doc = {"$set": user_document}

        # The `upsert=True` option instructs the method to create a document if no documents match the filter.
        result = user_collection.update_one(filter_query, update_doc, upsert=False)

        con.close_connection()
        print("Successfully deleted one document.")
        return True
    except Exception as e:
        print(e)
        # print(f"Error deleting user: {e}")
        con.close_connection()
        return False