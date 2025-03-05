import express, {Request, Response, NextFunction} from "express";
import dotenv from 'dotenv';
import { readFileSync } from "fs";
import path from "path";
import cors from "cors"
// import booksData from "../ecommerce"

// configure dotenv
dotenv.config();

// instantiate express
const app = express();

// load the variables
const port = process.env.PORT
const secret = process.env.SECRET
console.log(port);
console.log(secret);

// enable cors for all origins
// app.use(cors())

// enable cors with options
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true, // allow session cookies
}))

// get the current directory
const _dirname = path.resolve()

// synchronously read the file
// const eventData = readFileSync(
//     path.join(_dirname, "src", "db", "eventsData.json")
// )
// console.log(eventData);

const booksData = readFileSync(
    path.join(_dirname, "src", "db", "db.json"), "utf-8"
)

// simple GET request
app.get('/', (req, res) => {
    res.send('Hello World!');
})
// app.get('/events', (req, res) => {
//     res.send(eventData);
// })

const books = JSON.parse(booksData)
app.get('/books', (req, res) => {
    res.send(books.books);
})

// get API that filters books based on query parameters
app.get('/api/books', (req: Request, res: Response) => {
    try {
        const { title, genre, author, year } = req.query;

        let filteredBooks = [...books.books]; // Use books.books to match your db.json structure

        // Filtering logic with type safety and undefined checks
        if (title && typeof title === 'string') {
            filteredBooks = filteredBooks.filter(book => 
                book.title.toLowerCase().includes(title.toLowerCase())
            );
        }
        if (genre && typeof genre === 'string') {
            filteredBooks = filteredBooks.filter(book => 
                book.genre.toLowerCase() === genre.toLowerCase()
            );
        }
        if (author && typeof author === 'string') {
            filteredBooks = filteredBooks.filter(book => 
                book.author.toLowerCase().includes(author.toLowerCase())
            );
        }
        if (year && typeof year === 'string') {
            // Convert year to number for comparison with book.year (which is a number in db.json)
            const yearNum = parseInt(year, 10);
            if (!isNaN(yearNum)) {
                filteredBooks = filteredBooks.filter(book => book.year <= yearNum);
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

// create server
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});

