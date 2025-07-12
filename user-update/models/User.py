
import time
import random

class User:
    """
    This class gives User model
    
    @author Utshab Saha
    @email utshab500@gmail.com
    """
    def __init__(self):
        # Declaring protected members
        self._id = f"us_{random.randint(0, int(time.time() * 1000))}"
        self.name = None
        self.email = None
        self.assignedTaskIds = None

    # Getters
    def get_id(self):
        return self._id

    def get_name(self):
        return self.name

    def get_email(self):
        return self.email

    def get_assigned_task_ids(self):
        return self.assignedTaskIds

    # Setters
    def set_id(self, id):
        self._id = id

    def set_name(self, name):
        self.name = name

    def set_email(self, email):
        self.email = email

    def set_assigned_task_ids(self, assignedTaskIds):
        self.assignedTaskIds = assignedTaskIds

    def set_user(self, user, user_object):
        """
        This function encapsulates user data to User Model. It updates the value of the
        received reference. Hence no need of return statement
        :param user: dict
        :param user_object: User
        """
        if '_id' in user:
            user_object.set_id(user['_id'])
        else:
            user_object.set_id(user_object.get_id())
        user_object.set_name(user.get('name'))
        user_object.set_email(user.get('email'))
        user_object.set_assigned_task_ids(user.get('assignedTaskIds'))
