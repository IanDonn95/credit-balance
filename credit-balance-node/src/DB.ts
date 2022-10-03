import { Collection, MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import { Creditor } from './Types';
dotenv.config();


const MONGO_CREDENTIALS = process.env.MONGO_CREDENTIALS;
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(`${MONGO_URL}?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority`, {
	sslKey: MONGO_CREDENTIALS,
	sslCert: MONGO_CREDENTIALS,
	serverApi: ServerApiVersion.v1
});

async function connect() {
	await client.connect();
	const database = client.db("creditorsDB");
	const collection = database.collection<Creditor>("creditors");
	return collection;
}

async function close() {
	try {
		// await client.close(); // silently close when node exits instead?
	} catch (e) {
		console.error(e);
	}
}

export async function query<D>(action: (collection: Collection<Creditor>) => Promise<D>) {
	try {
		const collection = await connect();
		return await action(collection);
	} catch (e) {
		console.error(e);
	}
	 finally {
		await close();
	}
}