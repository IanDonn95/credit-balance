import { Collection, MongoClient } from 'mongodb';
import { Creditor } from './Types';

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}`);

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