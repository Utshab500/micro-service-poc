import pkg from "mongodb";
const { MongoClient } = pkg;

import Connection from "./connection.js";
import User from "../models/User.js";

/**
 * Definig user model
 */
export const userModel = {
    name: String,
    email: String,
    asignedTaskIds: Array
};


/**
 * Accepts an object of type User model and fetch matching data from DB
 * @param {User} userDocument 
 * @returns {boolean}
 */
export async function get(userDocument) {
    try {
        console.log(`Query data: ${JSON.stringify(userDocument)}`);
        let conn = new Connection();
        const connClient = await conn.getClient();

        let userCollection = connClient.client.db(conn.DB_NAME).collection("users");

        // userDocument is {} when all records to be fetched
        const result = userCollection.find(userDocument);

        if ((result.count()) === 0) {
            console.log("No documents found!");
        }
        let items = [];
        return result.forEach(item => items.push(item)).then(res => {
            conn.closeConnection();
            return {status: true, result: items};
        });
    } catch (error) {
        console.error("Error inserting user:", error);
        return false;
    }
};