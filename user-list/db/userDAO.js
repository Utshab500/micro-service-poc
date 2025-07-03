import pkg from "mongodb";
const { MongoClient } = pkg;

import Connection from "./connection.js";

/**
 * Definig user model
 */
export class User {
    name = "";
    email = "";
    asignedTaskIds = [];
};

/**
 * Accepts an object of type User model and fetch matching data from DB
 * @param {User} userDocument 
 * @returns {boolean}
 */
export async function get(userDocument = new User()) {
    try {
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