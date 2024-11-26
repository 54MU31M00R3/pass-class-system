import express from 'express';
import mongoose from 'mongoose';

const app = express();
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const COLLECTION = 'PASS';

mongoose
    .connect(`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.e9noz.mongodb.net/${COLLECTION}?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        app.listen(5000);
    })
    .catch((error) => {
        console.log(error);
    })