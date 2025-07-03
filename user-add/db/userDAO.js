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
 * Accepts an object of type User model and inserts into DB
 * @param {User} userDocument 
 * @returns {boolean}
 */
export async function insert (userDocument = new User()) {
    try {
        let conn = new Connection();
        const connClient = await conn.getClient();
        let userCollection = connClient.client.db(conn.DB_NAME).collection("users");
        const result = await userCollection.insertOne(userDocument);
        console.dir(result.insertedCount);
        await conn.closeConnection();
        return true;
    } catch (error) {
        console.error("Error inserting user:", error);
        return false;
    }
};