import { User, insert } from "../db/userDAO.js";

export async function addUser(data) {
    const user = new User();
    user.name = data['name'];
    user.email = data['email'];
    user.asignedTasks = data['asignedTasks'];
    return insert(user).then(resp => resp).catch(error => false);
}