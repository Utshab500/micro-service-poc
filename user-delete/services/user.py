from db.userDAO import delete_user

def delete_user_service(user_id) -> bool:
    """
    Accepts a user_id and deletes the user from the DB.
    :param user_id: str
    :return: bool
    """
    if not user_id:
        print("❌ User ID is required")
        return False
    
    result = delete_user(user_id)
    
    if result:
        print(f"✅ User with ID {user_id} deleted successfully")
    else:
        print(f"❌ Failed to delete user with ID {user_id}")
    
    return result
