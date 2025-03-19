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
import authRoutes from "./routes/authRoutes";
import usersRoutes from "./routes/usersRoutes";
import bookRoutes from "./routes/bookRoutes";
import bookCopyRoutes from "./routes/bookCopyRoutes";

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
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", usersRoutes)
app.use("/api/v1/books", bookRoutes)
app.use("/api/v1/bookCopy", bookCopyRoutes)
// Middlewares for error handlers


// start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
}) 