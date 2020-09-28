const express = require('express');
const connectDB = require('./config/conectiondb');
var cors = require('cors');

const app = express();

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,HEAD,OPTIONS,POST,PUT,DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    );
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//Init Middlewear
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('API Running');
});

const customerSignUp = require('./routes/APIs/Customer/signup');
const customerSignIn = require('./routes/APIs/Customer/signin');
const customerProfile = require('./routes/APIs/Customer/custProfile');
const customerReviews = require('./routes/APIs/Customer/reviews');
const customerOrders = require('./routes/APIs/Customer/orders');
const customerAuth = require('./routes/APIs/auth');

const restaurantSignUp = require('./routes/APIs/Restaurant/signup');
const restaurantSignIn = require('./routes/APIs/Restaurant/signin');
const restaurantProfile = require('./routes/APIs/Restaurant/restProfile');
const restaurantReviews = require('./routes/APIs/Restaurant/reviews');
const restaurantOrders = require('./routes/APIs/Restaurant/orders');

const events = require('./routes/APIs/upcomingEvents/events');

app.use('/customer/signUP', customerSignUp);
app.use('/customer/signIn', customerSignIn);
app.use('/customer/profile', customerProfile);
app.use('/customer/reviews', customerReviews);
app.use('/customer/orders', customerOrders);
app.use('/customer/auth', customerAuth);

app.use('/restaurant/signUP', restaurantSignUp);
app.use('/restaurant/signIn', restaurantSignIn);
app.use('/restaurant/profile', restaurantProfile);
app.use('/restaurant/reviews', restaurantReviews);
app.use('/restaurant/orders', restaurantOrders);

app.use('/events', events);

const authorization = require('./middleware/auth');
app.use('/auth', authorization);

app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});