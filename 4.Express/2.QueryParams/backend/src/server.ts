// import express from "express";
// import dotenv from 'dotenv';
// import { readFileSync } from "fs";
// import path from "path";
// import cors from "cors"

// // configure dotenv
// dotenv.config();

// // instantiate express
// const app = express();

// // load the variables
// const port = process.env.PORT
// const secret = process.env.SECRET
// console.log(port);
// console.log(secret);

// // enable cors for all origins
// // app.use(cors())

// // enable cors with options
// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "PUT", "DELETE"],
//     credentials: true, // allow session cookies
// }))

// // get the current directory
// const _dirname = path.resolve()

// // synchronously read the file
// const eventData = readFileSync(
//     path.join(_dirname, "src", "db", "eventsData.json")
// )
// // console.log(eventData);

// const booksData = readFileSync(
//     path.join(_dirname, "..", "..", "3.Typescript", "ecommerceTS", "src", "db.json"), "utf-8"
// )

// // simple GET request
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })
// app.get('/events', (req, res) => {
//     res.send(eventData);
// })

// app.get('/books', (req, res) => {
//     res.send(booksData);
// })

// // create server
// app.listen(port, () => {
//     console.log(`server is running on port: ${port}`);
// });