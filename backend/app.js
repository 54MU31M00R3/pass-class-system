import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import userRouter from './routes/users-routes.js';
import sectionRouter from './routes/sections-routes.js';
import contentRouter from './routes/content-routes.js';

// getting environment variables to access the database
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
// setting collection name
const COLLECTION = 'PASS';

// instantiate express app
const app = express();

// allows for requests to be sent to the backend
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
})

// used to read data sent in json format from the frontend
app.use(bodyParser.json());

// defined routers for each different types of requests
app.use('/api/users', userRouter);
app.use('/api/sections', sectionRouter)
app.use('/api/content', contentRouter)

// connection to database
mongoose
    .connect(`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.e9noz.mongodb.net/${COLLECTION}?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        app.listen(5000);
    })
    .catch((error) => {
        console.log(error);
    })