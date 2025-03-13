// bookController.ts

import { Request, Response, NextFunction} from "express";
import { pool } from '../backend/src/server'
import asyncHandler from '../middlewares/asyncHandler'
// GET all books with filtering
export const getBooks = asyncHandler(async (req: Request, res: Response) => {
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
export const getBookById = asyncHandler (async (req: Request, res: Response) => {
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
export const createBook = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { title, author, genre, year, pages, publisher, description, image, user_id } = req.body;
        const query = `
            INSERT INTO books (title, author, genre, year, pages, publisher, description, image, user_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `;
        const values = [title, author, genre, year, pages, publisher, description, image, user_id];
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT (update) a book
export const putBook = asyncHandler (async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { title, author, genre, year, pages, publisher, description, image, user_id } = req.body;
        const query = `
            UPDATE books
            SET title = $1, author = $2, genre = $3, year = $4, pages = $5, publisher = $6, description = $7, image = $8, user_id = $9
            WHERE id = $10
            RETURNING *;
        `;
        const values = [title, author, genre, year, pages, publisher, description, image, user_id, id];
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
export const patchBook = asyncHandler( async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: "Invalid ID: ID must be a number" });
            return;
        }
        const { title, author, genre, year, pages, publisher, description, image, user_id } = req.body;
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
                user_id = COALESCE($9, user_id),
                updated_at = NOW()
            WHERE id = $10
            RETURNING *;
        `;
        const values = [title || null, genre || null, year || null, publisher || null, pages || null, description || null, image || null, author || null, user_id || null, id];
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
export const deleteBook = asyncHandler(
async (req: Request, res: Response) => {
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

