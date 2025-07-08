from db.Connection import Connection

def delete_user(user_id: str) -> bool:
    """
    Accepts a user_id and deletes the user from the DB.
    :param user_id: str
    :return: bool
    """
    con = Connection()
    try:
        conn = con.get_connection()
        print("DEBUG")
        db = conn['client'][con.DB_NAME]
        user_collection = db["users"]
        query = {"_id": user_id}
        print(f"Query: {query}")
        result = user_collection.delete_one(query)
        con.close_connection()
        if result.deleted_count == 1:
            print("Successfully deleted one document.")
            return True
        else:
            print("No documents matched the query. Deleted 0 documents.")
            return False
    except Exception as e:
        print(e)
        # print(f"Error deleting user: {e}")
        con.close_connection()
        return False