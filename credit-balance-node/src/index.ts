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
    balance: { $gt: 2000 }, // only include creditors with balance above 2000
    minPaymentPercentage: { $lte: 29.99 } // and also with minPaymentPercentage at most 29.99
}, {
    projection: { _id: 0} // exclude Mongo unique id, since we have our own id field
}).toArray();

// enable GET API call to find good creditors
app.get('/goodCreditors', async (req, res) => {
    const creditors = await query(CREDITORS_COLLECTION, getGoodCreditors);
    res.send(creditors);
});

/**
 * enable POST API call to add a new creditor
 * first get the next unused ID to attach to the creditor
 * this id is stored in a "sequence" collection that we increment each time we retrieve the next value
 * then the creditor data is stored in the creditor collection, including the new ID
 * DEV NOTE- a future improvement would be to convert this to a single DB transaction, but a partial save won't break the DB
 * we would just skip an ID in the sequence
 */
app.post(`/creditor`, async (req, res) => {
    const { value: { id: nextId } } = await query(CREDITORS_ID_SEQUENCE_COLLECTION, col => col.findOneAndUpdate({}, {
        $inc: { id: 1 }
    }));
    const newCreditor = { ...req.body, id: nextId };
    await query(CREDITORS_COLLECTION, col => col.insertOne(newCreditor)); // save the new creditor
    const creditors = await query(CREDITORS_COLLECTION, getGoodCreditors); // return up-to-date creditors list
    res.send(creditors);
})

// this starts the express server
app.listen(port, () => {
    console.log(`Node backend initialized on port ${port}`);
});