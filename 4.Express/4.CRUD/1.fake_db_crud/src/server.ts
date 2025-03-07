import express, { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import { readFileSync } from "fs";
import path from "path";
import cors from "cors"
// import booksData from "../ecommerce"

interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    year: number;
    pages: number;
    publisher: string;
    description: string;
    image: string;
}

// Define booksData (shared or passed from index.ts)

//1. configure dotenv
dotenv.config();

//2. instantiate express
const app = express();

//3. load the variables
const port = process.env.PORT
const secret = process.env.SECRET
console.log(port);
console.log(secret);



//4. enable middleware

// enable cors for all origins
// app.use(cors())

// middleware to parse JSON request bodies

// app.use(express.json());

// // middleware to log requests

// app.use((req, res, next) => {
//     console.log(`${req.method} request to ${req.url}`);
//     next();
// });
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

// lets fetch 

// get API to fetch a specific book by ID (route param)
app.get('/api/books/:id', (req: Request, res: Response) => {
    try {
        // Get the ID from route params and convert it to a number
        const bookId = Number(req.params.id);
        if (isNaN(bookId)) {
            res.status(400).json({ error: "Invalid book ID. ID must be a number." });
            return
        }

        // Find the book by ID (books.books is an array from db.json)
        const book = books.books.find((book: Book) => book.id === bookId);

        if (!book) {
            res.status(404).json({ error: "Book not found" });
        } else {
            res.status(200).json(book);
        }

        res.json(book)

    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// create a new book
// POST
// when sending data it needs to be in JSOn format
// this means we have to add Middleware to help with that
app.post('/api/books/post', (req: Request, res: Response) =>{ 

// destructure incoming body req
    const body = req.body;
    const bookName = req.body.bookName;

    const newId = booksData.length > 0 ? booksData[booksData.length -1].bookId + 1 : 1
    booksData.push(newData)

    res.status(201).json({
        message: "Book created successfully",
        payload: newData
    })
    res.send("success")
})

// app.put('/api/v1/users/:id', (req: Request, res: Response) => {
//     const bookId = Number(req.params.id)
//     const { userName, displayName } = req.body

//     // validate the input
//     if (isNaN(bookId)) {
//         res.status(400).json({ message: "Invalid user ID" })
//         return
//     }

//     const bookIndex = booksData.findIndex((books.book) => books.bookID === bookId)

// if the user index is unavailable
// if (bookIndex === -1) {
//     res.status(404).json({ message: "User not found" })
//     return
// }

// // replace the user at that index with new data
// // make sure while using put, put all relevant data even the id
// booksData[bookIndex] = { userID: bookId, userName, displayName }

// res.json({ message: "User successfully updated", user: userData[userIndex] })
// })

// // implement Patch-partially update user eg forget password
// app.patch('/api/v1/users/:id', (req: Request, res: Response) => {
//     if(userName)books.userName = userName
//     if (displayName) books.displayName = displayName

//     res.
// })



// create server
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});

