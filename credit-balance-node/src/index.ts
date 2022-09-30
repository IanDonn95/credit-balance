import express from 'express';
import cors from 'cors';

import './DB';

const app = express();
const port = 3001;

app.use(cors());

app.get('/getGoodCreditors', (req, res) => {
    res.send([]);
});

app.post(`/creditor`, (req, res) => {
    res.send([req.body]);
})

app.listen(port, () => {
    console.log(`Node backend initialized on port ${port}`);
});