const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('API Running'));

app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});