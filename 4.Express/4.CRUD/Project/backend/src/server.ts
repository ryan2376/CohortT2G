import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Pool } from "pg";
// import authRoutes from "/dev/Cohort/CohortT2G/4.Express/4.CRUD/Project/routes/authRoutes"
// import userRoutes from "/dev/Cohort/CohortT2G/4.Express/4.CRUD/Project/routes/userRoutes"
import bookRoutes from "../../routes/bookRoutes"
import { createBook, deleteBook, getBookById, getBooks, patchBook, putBook } from "../../controllers/booksController";


// Load environment variables
dotenv.config();

// Instantiate express
const app = express();

// PostgreSQL connection pool
export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"),
});

// Test the connection
pool.connect((err, client, release) => {
    if (err) {
        console.error("Error connecting to PostgreSQL:", err.stack);
    } else {
        console.log("Connected to PostgreSQL successfully!");
        release();
    }
});

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
app.get('/api/users', async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

// post a new user
app.post('/api/users', async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        // check if email exists
        const emailCheck = await pool.query("SELECT id FROM users WHERE email = $1", [email])

        if(emailCheck.rows.length > 0){
            res.status(400).json({ message: "User already exists" });
            return
        }
        const query = `
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [name, email, password];
        const result = await pool.query(query, values);
        res.status(201).json({
            message: "User added successfully",
            user: result.rows[0]
        });


    }catch(error){
        console.error("Error validating user input:", error);
        res.status(400).json({ error: "Invalid user input" });
        return;
    }    
})

// GET all books with filtering
app.get("/api/books", getBooks);

// GET book by ID
app.get("/api/books/:id", getBookById);

// POST a new book
app.post("/api/books", createBook)

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