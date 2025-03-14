// dotenv configure
// instance of express
// load all variables
// enable all middlewares
// create all routes
// load more middlewares - error handlers
// start server

import express from "express";
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()


const app = express();

// NEVER FORGET
app.use(express.json()) //parses  application/json

// 
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:5173',
    methods: "GET, POST, PUT, PATCH, DELETE",
    credentials: true
}))


// routes
app.get('/api/v1/test', (req, res) => {
    res.send({ message: 'Hello, World!' })
})

// Middlewares for error handlers


// start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
}) 