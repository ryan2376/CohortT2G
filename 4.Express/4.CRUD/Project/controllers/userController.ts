import { Request, Response, NextFunction} from "express";
import bcrypt from "bcrypt";
import { Pool } from "pg";


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"),
});

export const loginUser = (req: Request, res: Response, next: NextFunction) => {

}
export const registerUser = async(req: Request, res: Response, next: NextFunction) => {
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
            
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
;        
    
    
        }catch(error){
            console.error("Error validating user input:", error);
            res.status(400).json({ error: "Invalid user input" });
            return;
        }    

}