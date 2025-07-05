import { userModel, get } from "../db/userDAO.js";
import User from "../models/User.js";

export async function getAlluser() {
    return get({}).then(resp => resp).catch(error => false);
}

export async function getUser(data) {
    const user = new User();
    user.setUser(data, user);
    console.log("User Objet:", user);
    // Exclude keys with null or undefined values
    const filter = Object.fromEntries(
    Object.entries(user)
        .filter(([_, v]) => v !== null && v !== undefined)
    );
    console.log("Filter Object:", filter);
    return Object.keys(filter).length === 0 ? "Nothing to fetch" : get(filter).then(resp => resp).catch(error => false);
}