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

async function connect(collectionName: string) {
	await client.connect();
	const database = client.db("creditorsDB");
	const collection = database.collection<Creditor>(collectionName);
	return collection;
}

export async function query<D>(collectionName: string, action: (collection: Collection<Creditor>) => Promise<D>) {
	try {
		const collection = await connect(collectionName);
		return await action(collection);
	} catch (e) {
		console.error(e);
	}
}