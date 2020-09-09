const express = require('express');
const connectDB = require('./config/conectiondb');

const app = express();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('API Running');
});

app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});