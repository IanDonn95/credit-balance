import express from 'express';
import cors from 'cors';

import { query } from './DB';
import { Creditor } from './Types';

const app = express();
const port = 3001;

app.use(cors());

app.get('/getGoodCreditors', async (req, res) => {
    const creditors = await query(col => col.find<Creditor>({
        balance: { $gt: 2000 },
        minPaymentPercentage: { $lte: 29.99 },
    }).toArray());
    res.send(creditors);
});

app.post(`/creditor`, async (req, res) => {
    const inserted = await query(col => col.insertOne(req.body));
    res.send([inserted]);
})

app.listen(port, () => {
    console.log(`Node backend initialized on port ${port}`);
});