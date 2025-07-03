import pkg from "mongodb";
const { MongoClient } = pkg;

/**
 * This class handles MongoDB Connection
 * 
 * @author Utshab Saha
 * @email utshab500@gmail.com
 */
export default class Connection {

  /**
   * Provisioning for Custome connection on the go and default connection for the Application
   * @param {string} DB_HOST 
   * @param {string} DB_NAME 
   */
  constructor(DB_HOST=process.env.DB_HOST, DB_NAME=process.env.DB_NAME) {
    this.DB_HOST = DB_HOST;
    this.DB_NAME = DB_NAME;
    this._client = null;
    console.log(this.DB_HOST);
    console.log(this.DB_NAME);
  }

  /**
   * @returns {JSON} {status: boolean, client: MongoClient}
   */
  async getClient() {
      // Create a new MongoClient
      this._client = new MongoClient(this.DB_HOST); 
      
      // Connect the client to the server
      const conn = await this._client.connect();
      const connect_check = await conn.db().command({ ping: 1 });
      console.log(connect_check);
      let status = false;
      if (!connect_check.ok) {
        throw new Error("❌ Failed to connect to the database");
      }
      else {
        status = true;
        console.log("✅ Connected successfully to server");
      }
      return {
        status: status,
        client: this._client
      };
  }

  async closeConnection() {
    await this._client.close();
  }

}