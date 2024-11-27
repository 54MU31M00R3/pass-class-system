import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import userRouter from './routes/users-routes.js';
import sectionRouter from './routes/sections-routes.js';
import contentRouter from './routes/content-routes.js';

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const COLLECTION = 'PASS';

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
})

app.use(bodyParser.json());

app.use('/api/users', userRouter);
app.use('/api/sections', sectionRouter)
app.use('/api/content', contentRouter)

mongoose
    .connect(`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.e9noz.mongodb.net/${COLLECTION}?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        app.listen(5000);
    })
    .catch((error) => {
        console.log(error);
    })