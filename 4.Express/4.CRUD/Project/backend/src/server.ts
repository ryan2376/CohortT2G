import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Pool } from "pg";

// Load environment variables
dotenv.config();

// Instantiate express
const app = express();

// PostgreSQL connection pool
const pool = new Pool({
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

// GET all books with filtering
app.get("/api/books", async (req: Request, res: Response) => {
    try {
        const { genre, year, title } = req.query;
        let query = "SELECT * FROM books";
        const values: any[] = [];

        if (genre || year || title) {
            query += " WHERE";
            const conditions = [];
            if (genre) {
                conditions.push("genre = $1");
                values.push(genre);
            }
            if (year) {
                conditions.push("year = $2");
                values.push(parseInt(year as string, 10));
            }
            if (title) {
                conditions.push("title ILIKE $3");
                values.push(`%${title}%`);
            }
            query += " " + conditions.join(" AND ");
        }

        const result = await pool.query(query, values);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET book by ID
app.get("/api/books/:id", async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: "Book not found" });
        }
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST a new book
app.post("/api/books", async (req: Request, res: Response) => {
    try {
        const { title, author, genre, year, pages, publisher, description, image } = req.body;
        const query = `
            INSERT INTO books (title, author, genre, year, pages, publisher, description, image)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;
        const values = [title, author, genre, year, pages, publisher, description, image];
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT (update) a book
app.put("/api/books/:id", async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { title, author, genre, year, pages, publisher, description, image } = req.body;
        const query = `
            UPDATE books
            SET title = $1, author = $2, genre = $3, year = $4, pages = $5, publisher = $6, description = $7, image = $8
            WHERE id = $9
            RETURNING *;
        `;
        const values = [title, author, genre, year, pages, publisher, description, image, id];
        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: "Book not found" });
        }
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// PATCH a book
app.patch("/api/books/:id", async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid ID: ID must be a number" });
            return;
        }
        const { title, author, genre, year, pages, publisher, description, image } = req.body;
        const query = `
            UPDATE books
            SET title = COALESCE($1, title),
                genre = COALESCE($2, genre),
                year = COALESCE($3, year),
                publisher = COALESCE($4, publisher),
                pages = COALESCE($5, pages),
                description = COALESCE($6, description),
                image = COALESCE($7, image),
                author = COALESCE($8, author),
                updated_at = NOW()
            WHERE id = $9
            RETURNING *;
        `;
        const values = [title || null, genre || null, year || null, publisher || null, pages || null, description || null, image || null, author || null, id];
        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: "Book not found" });
        }
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE a book
app.delete("/api/books/:id", async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query("DELETE FROM books WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length > 0) {
            res.status(200).json({ message: "Book deleted" });
        } else {
            res.status(404).json({ error: "Book not found" });
        }
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});