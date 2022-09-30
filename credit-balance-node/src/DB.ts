import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();


const MONGO_CREDENTIALS = process.env.MONGO_CREDENTIALS;
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(`${MONGO_URL}?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority`, {
  sslKey: MONGO_CREDENTIALS,
  sslCert: MONGO_CREDENTIALS,
  serverApi: ServerApiVersion.v1
});


async function run() {
    try {
      await client.connect();
      const database = client.db("creditorsDB");
      const collection = database.collection("creditors");
      const docCount = await collection.countDocuments({});
      console.log(docCount); // test
      // perform actions using client
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

run().catch(console.dir);