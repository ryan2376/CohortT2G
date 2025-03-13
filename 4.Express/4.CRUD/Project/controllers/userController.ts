// userController.ts

import { Request, Response, NextFunction} from "express";
import bcrypt from "bcrypt";
import { pool } from "../backend/src/server";
import asyncHandler from "../middlewares/asyncHandler";


export const getUsers =asyncHandler(async(req: Request, res: Response) => {
        try {
            const result = await pool.query("SELECT * FROM users");
            res.status(200).json(result.rows);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    })

export const loginUser = (req: Request, res: Response, next: NextFunction) => {

}
export const registerUser = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
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
            
        // const salt = await bcrypt.genSalt(10)
        // const hashedPassword = await bcrypt.hash(password, salt)

    
        }catch(error){
            console.error("Error validating user input:", error);
            res.status(400).json({ error: "Invalid user input" });
            return;
        }    

})

