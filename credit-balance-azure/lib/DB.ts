import { Collection, MongoClient, ServerApiVersion } from 'mongodb';
import { Creditor } from './Types';

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const client = new MongoClient(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.qbvmgv5.mongodb.net/test`);

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