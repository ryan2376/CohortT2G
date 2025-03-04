import express from "express";
import dotenv from 'dotenv';

// configure dotenv
dotenv.config();

// instance of express
const app = express();

// load the variables
const port = process.env.PORT
console.log(port);

// simple GET request
app.get('/', (req, res) => {
    res.send('Hello World!');
})


// create server
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});