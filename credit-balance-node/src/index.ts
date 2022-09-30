import express from 'express';
const app = express();
const port = 3001;

app.get('/getGoodCreditors', (req, res) => {
    res.send([]);
});


app.listen(port, () => {
    console.log(`Node backend initialized on port ${port}`);
});