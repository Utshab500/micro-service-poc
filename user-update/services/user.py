from db.userDAO import update_user

def update_user_service(user: dict) -> bool:
    """
    Accepts a json object and updates the user from the DB.
    :param user: dict
    :return: bool
    """
    if not user or not isinstance(user, dict):
        print("❌ User ID is required")
        return False
    
    result = update_user(user)
    
    if result:
        print(f"✅ User updated successfully")
    else:
        print(f"❌ Failed to update user")
    
    return result
