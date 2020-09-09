const express = require('express');
const connectDB = require('./config/conectiondb');

const app = express();

//Init Middlewear
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('API Running');
});

const customerSignUp = require('./routes/APIs/Customer/signup');
app.use('/customer/signUP', customerSignUp);

app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});