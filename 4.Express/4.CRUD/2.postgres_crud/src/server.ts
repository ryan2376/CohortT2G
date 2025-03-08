import express, { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import { readFileSync } from "fs";
import path from "path";
import cors from "cors"
import pool from "./db/db.config"; 

//1. configure dotenv
dotenv.config();

//2. instantiate express
const app = express();

//3. load the variables
const port = process.env.PORT
const secret = process.env.SECRET
console.log(port);
console.log(secret);

//4. enable middleware

// middleware to parse JSON request bodies

app.use(express.json());//this will enable stringifying to json

// // middleware to log requests

// enable cors with options
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true, // allow session cookies
}))

// Create user
// reading external files takes so the request has to be asynchronous
app.post('/api/v1/users', async (req:Request, res:Response) => {
    try{
        console.log(req.body);

        const{ name, email, password } = req.body

        // check if email exists
        const emailCheck = await pool.query("SELECT id FROM users WHERE email = $1", [email])

        if(emailCheck.rows.length > 0){
            res.status(400).json({message: "User already exists"})
            return
        }

        // insert new user
        const userResult = await pool.query(
            "INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *",
            [name, email, password])

        res.status(201).json({
            message: "User successfully created",
            user: userResult.rows[0]
        })
    }catch(error){
        console.log("Error creating user", error);
        res.status(500).json({message: "internal server error"})
    }
})

// app.post('/api/v1/books', async (req:Request, res:Response) => {
//     try{
//         const{ title, authorgenredescriptionpages, password } = req.body

//         // check if email exists
//         const userCheck = await pool.query("SELECT id FROM users WHERE email = $1", [user_id])

//     })

// get all users

app.get('/api/v1/users', async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM public.users ORDER BY id ASC")
        res.status(200).json(result.rows)
        }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
})


// create server
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});

