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
const customerSignIn = require('./routes/APIs/Customer/signin');
const customerProfile = require('./routes/APIs/Customer/custProfile');

const restaurantSignUp = require('./routes/APIs/Restaurant/signup');
const restaurantSignIn = require('./routes/APIs/Restaurant/signin');
const restaurantProfile = require('./routes/APIs/Restaurant/restProfile');

app.use('/customer/signUP', customerSignUp);
app.use('/customer/signIn', customerSignIn);
app.use('/customer/profile', customerProfile);

app.use('/restaurant/signUP', restaurantSignUp);
app.use('/restaurant/signIn', restaurantSignIn);
app.use('/restaurant/profile', restaurantProfile);

const authorization = require('./middleware/auth');
app.use('/auth', authorization);

app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});