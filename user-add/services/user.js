import { User, insert } from "../db/userDAO.js";

export async function addUser(data) {
    const user = new User();
    user.name = data['name'];
    user.email = data['email'];
    user.asignedTaskIds = data['asignedTaskIds'];
    return insert(user).then(resp => resp).catch(error => false);
}