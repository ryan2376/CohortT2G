import { renderBooks } from "./cart";
import { fetchData } from "./products";

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

let booksData: Book[] = [];
renderBooks(booksData)
fetchData() 
