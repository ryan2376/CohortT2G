// controllers/borrow.controller.ts
import { Request, Response } from 'express';
import { Pool } from 'pg';
import pool from '../config/db.config';// Adjust the path to your database config
import { BorrowRequestBody, BorrowResponse } from '../utils/types/borrowTypes';
import asyncHandler from '../middlewares/asyncHandler';

export const createBorrow = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { book_id, user_id } = req.body as BorrowRequestBody

    try {
        // Check if the book exists
        const bookCheck = await pool.query('SELECT * FROM public.books WHERE id = $1', [book_id]);
        if (bookCheck.rows.length === 0) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }
        // Check if the user exists
        const userCheck = await pool.query('SELECT * FROM public.users WHERE id = $1', [user_id]);
        if (userCheck.rows.length === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Find an available book copy
        const copyCheck = await pool.query(
            'SELECT * FROM public.bookcopies WHERE book_id = $1 AND status = $2  LIMIT 1',
            [book_id, "Available"]
        );
        if (copyCheck.rows.length === 0) {
            res.status(400).json({ message: 'No available copies of this book' });
            return;
        }
        const copyId = copyCheck.rows[0].copy_id;

        // Update the book copy to mark it as borrowed
        await pool.query(
            'UPDATE public.bookcopies SET status = $1 WHERE copy_id = $2',
            ['Borrowed', copyId] // Adjust case to match your database
        );
        // Set borrow and return dates
        const borrowDate = new Date();
        const returnDate = new Date(borrowDate);
        returnDate.setDate(borrowDate.getDate() + 14); // Return in 14 days

        // Create the borrow record
        const newBorrow = await pool.query(
            `INSERT INTO public.borrows (user_id, book_id, copy_id, librarian_id, borrow_date, return_date, status, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
            [
                user_id,
                book_id,
                copyId,
                null, // librarian_id (set to null for now; adjust if needed)
                borrowDate,
                returnDate,
                'Borrowed',
                new Date(),
                new Date()
            ]
        );
        const borrow: BorrowResponse = newBorrow.rows[0];
        res.status(201).json({
            message: 'Book borrowed successfully',
            borrow
        });
    } catch (error) {
        console.error('Error borrowing book:', error);
        res.status(500).json({ message: 'Server error' });
    }
});