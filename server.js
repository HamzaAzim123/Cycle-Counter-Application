// JavaScript source code
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

let cycleCounts = [];

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/cycle-counts', (req, res) => {
    res.json(cycleCounts);
});

app.post('/api/cycle-counts', (req, res) => {
    const { item, quantity } = req.body;
    const date = new Date();
    cycleCounts.push({ item, quantity, date });
    res.status(201).json({ message: 'Cycle count added successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});