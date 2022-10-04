import express from 'express';
import cors from 'cors';

import { query } from './DB';
import { Creditor } from './Types';
import { Collection } from 'mongodb';

const app = express();
const port = 3001;

const CREDITORS_COLLECTION = 'creditors';
const CREDITORS_ID_SEQUENCE_COLLECTION = 'creditorIdSequence';

app.use(cors()); // configures express to use CORS headers
app.use(express.json()); // configures express to parse POST-body JSON automatically

const getGoodCreditors = (col: Collection<Creditor>) => col.find<Creditor>({
    balance: { $gt: 2000 },
    minPaymentPercentage: { $lte: 29.99 },
}, {
    projection: { _id: 0} // exclude Mongo unique id, since we have our own id field
}).toArray();

app.get('/goodCreditors', async (req, res) => {
    const creditors = await query(CREDITORS_COLLECTION, getGoodCreditors);
    res.send(creditors);
});

app.post(`/creditor`, async (req, res) => {
    const { value: { id: nextId } } = await query(CREDITORS_ID_SEQUENCE_COLLECTION, col => col.findOneAndUpdate({}, {
        $inc: { id: 1 }
    }));
    const newCreditor = { ...req.body, id: nextId };
    await query(CREDITORS_COLLECTION, col => col.insertOne(newCreditor)); // save the new creditor
    const creditors = await query(CREDITORS_COLLECTION, getGoodCreditors); // return up-to-date creditors list
    res.send(creditors);
})

app.listen(port, () => {
    console.log(`Node backend initialized on port ${port}`);
});