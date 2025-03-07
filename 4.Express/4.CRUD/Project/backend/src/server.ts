import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import path from "path";
import cors from "cors";

// configure dotenv
dotenv.config();

// instantiate express
const app = express();

// load the variables
const port = process.env.PORT;
const secret = process.env.SECRET;
console.log(port);
console.log(secret);

// enable cors with options
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true, // allow session cookies
}));

// get the current directory
const _dirname = path.resolve();

// synchronously read the file
const booksData = readFileSync(path.join(_dirname, "src", "db", "db.json"), "utf-8");
const books = JSON.parse(booksData);

// simple GET request
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/books", (req, res) => {
    res.send(books.books);
});

// get API that filters books based on query parameters
app.get("/api/books", (req: Request, res: Response) => {
    try {
        const { title, genre, author, year } = req.query;

        let filteredBooks = [...books.books]; // Use books.books to match your db.json structure

        // Filtering logic with type safety and undefined checks
        if (title && typeof title === "string") {
            filteredBooks = filteredBooks.filter((book) =>
                book.title.toLowerCase().includes(title.toLowerCase())
            );
        }
        if (genre && typeof genre === "string") {
            filteredBooks = filteredBooks.filter((book) =>
                book.genre.toLowerCase() === genre.toLowerCase()
            );
        }
        if (author && typeof author === "string") {
            filteredBooks = filteredBooks.filter((book) =>
                book.author.toLowerCase().includes(author.toLowerCase())
            );
        }
        if (year && typeof year === "string") {
            // Convert year to number for comparison with book.year (which is a number in db.json)
            const yearNum = parseInt(year, 10);
            if (!isNaN(yearNum)) {
                filteredBooks = filteredBooks.filter((book) => book.year <= yearNum);
            }
        }

        if (filteredBooks.length === 0) {
            res.status(200).send([]); // Send empty array for no matches, not 404
        } else {
            res.status(200).send(filteredBooks);
        }
    } catch (error) {
        console.error("Error filtering books:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});

// Add endpoint for specific book by ID
app.get("/api/books/:id", (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const book = books.books.find((b: any) => b.id === id);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ error: "Book not found" });
        }
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// create server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});