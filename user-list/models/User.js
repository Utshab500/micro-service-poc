/**
 * This class gives User model
 * 
 * @author Utshab Saha
 * @email utshab500@gmail.com
 */
export default class User {

    constructor () {

        /**
         * Since User Get Microservice does not use _id, it is commented out
         */
        // this._id = "us_" + Math.floor(Math.random() * new Date().getTime());

        /**
         * Declearing protected members
         */
        this.name = null;
        this.email = null;
        this.assignedTaskIds = null;
    }

    // Getters 
    // getId() { return this._id }
    getName() { return this.name }
    getEmail() { return this.email }
    getAssignedTaskIds() { return this.assignedTaskIds }


    //Setters
    // setId(id) { this._id = id }
    setName(name) { this.name = name }
    setEmail(email) { this.email = email }
    setAssignedTaskIds(assignedTaskIds) { this.assignedTaskIds = assignedTaskIds }

    /**
     * This function encapsulates user data to User Model. It updates the value of the
     * received reference. Hence no need of return statement
     * 
     * @param {JSON} user 
     * @param {User} UserObject 
     */
    setUser(user, UserObject) {
        // if(Object.keys(user).includes('_id')) {
        //     UserObject.setId(user._id);
        // }
        // else {
        //     UserObject.setId(UserObject.getId());
        // }
        
        UserObject.setName(user.name);
        UserObject.setEmail(user.email);
        UserObject.setAssignedTaskIds(user.assignedTaskIds);
    }
}