const express = require('express');
const connectToMongo = require('./db');
const authRoute = require('./routes/auth');
const carRoute = require('./routes/car');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 5000;
connectToMongo();


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token']
}));


app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/cars', carRoute);

// serving static files
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
    console.log(`Chatbot server running on http://localhost:${port}`);
});
