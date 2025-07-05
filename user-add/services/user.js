import User from "../models/User.js";
import { insert } from "../db/userDAO.js";

export async function addUser(data) {
    const user = new User();
    user.setUser(data, user);
    return insert(user).then(resp => resp).catch(error => false);
}