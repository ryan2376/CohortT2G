// server.ts

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
// import authRoutes from "/dev/Cohort/CohortT2G/4.Express/4.CRUD/Project/routes/authRoutes"
import userRoutes from "../routes/userRoutes"
import bookRoutes from "../routes/bookRoutes"
import { createBook, deleteBook, getBookById, getBooks, patchBook, putBook } from "../controllers/booksController";
import { getUsers, registerUser } from "../controllers/userController";
import pool from "./db/config";

// Instantiate express
const app = express();

// Enable CORS
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}));

// Middleware to parse JSON
app.use(express.json());

// app.use("/auth", authRoutes)

// app.use(errorHandler)
// app.use(errorHandler)

// Get Users
app.get('/api/users', getUsers)

// post a new user
app.post('/api/users', registerUser)

// GET all books with filtering
app.get("/api/books", getBooks);

// GET book by ID
app.get("/api/books/:id", getBookById);

// POST a new book
app.use("/api/books", bookRoutes)

// PUT (update) a book
app.put("/api/books/:id", putBook);

// PATCH a book
app.patch("/api/books/:id", patchBook);

// DELETE a book
app.delete("/api/books/:id", deleteBook);

// create the routes
// app.use('/api/books', userRoutes)

// middlewares after routes


// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});