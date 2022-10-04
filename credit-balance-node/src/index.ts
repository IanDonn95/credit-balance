import express from 'express';
import cors from 'cors';

import { query } from './DB';
import { Creditor } from './Types';

const app = express();
const port = 3001;

const CREDITORS_COLLECTION = 'creditors';
const CREDITORS_ID_SEQUENCE_COLLECTION = 'creditorIdSequence';

app.use(cors());
app.use(express.json());

app.get('/goodCreditors', async (req, res) => {
    const creditors = await query(CREDITORS_COLLECTION, col => col.find<Creditor>({
        balance: { $gt: 2000 },
        minPaymentPercentage: { $lte: 29.99 },
    }).toArray());
    res.send(creditors);
});

app.post(`/creditor`, async (req, res) => {
    const { value: { id: nextId } } = await query(CREDITORS_ID_SEQUENCE_COLLECTION, col => col.findOneAndUpdate({}, {
        $inc: { id: 1 }
    }));
    const newCreditor = { ...req.body, id: nextId };
    const inserted = await query(CREDITORS_COLLECTION, col => col.insertOne(newCreditor));
    res.send(inserted);
})

app.listen(port, () => {
    console.log(`Node backend initialized on port ${port}`);
});