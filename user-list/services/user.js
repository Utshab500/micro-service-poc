import { User, get } from "../db/userDAO.js";

export async function getAlluser(data) {
    // const user = new User();
    // user.name = data['name'];
    // user.email = data['email'];
    // user.asignedTaskIds = data['asignedTaskIds'];
    return get({}).then(resp => resp).catch(error => false);
}