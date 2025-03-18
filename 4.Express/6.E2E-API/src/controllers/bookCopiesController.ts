import { Response } from "express";
import pool from "../config/db.config";
import { UserRequest } from "../utils/types/userTypes";
import asyncHandler from "../middlewares/asyncHandler";
import { BookRequest,Book } from "../utils/types/bookTypes";
import { BookCopyRequest } from "../utils/types/bookCopiesTypes";

export const createBookCopy = asyncHandler(async (req: BookCopyRequest, res: Response) => {

    try {
        // Extract user_id from the authenticated user's token
        if (!req.user) {
            res.status(401).json({ message: "Not authorized" });
            return;
        }

        // const created_by = req.user.id; // User ID from token
        const {book_id,inventory_number,condition,status,location} = req.body
        
        // Ensure that only an Librarian or the Adim can create an book copy

        if (req.user.role_name !== "Librarian" && req.user.role_name !== "Admin") {
            res.status(403).json({ message: "Access denied: Only Librarians or Admins can create books" });
            return;
        }
        // Insert book into the database
        const bookResult = await pool.query(
            `INSERT INTO bookcopies (book_id,inventory_number,condition,status,location) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [book_id,inventory_number,condition,status,location]
        );

        res.status(201).json({
            message: "book created successfully",
            book: bookResult.rows[0]
        });

    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
