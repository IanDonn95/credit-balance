import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());

app.get('/getGoodCreditors', (req, res) => {
    res.send([]);
});


app.listen(port, () => {
    console.log(`Node backend initialized on port ${port}`);
});