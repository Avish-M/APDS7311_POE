import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.MONGO_CONN_STRING
console.log(connectionString);

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log("SUCCESSFULLY CONNECTED TO THE DATABASE, THANK YOU :)")
} catch(e) {
  console.error(e);
}



  let db = conn.db("AVISH_MAHARAJ_ST10084642_APDS7311_POE");



  export default db;
  