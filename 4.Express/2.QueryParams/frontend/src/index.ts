import { renderBooks } from "./cart";
import { fetchData } from "./fetch";
// import { filterBooks, populateFilters, handleSearch} from "./searchFilter";


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

// let booksData: Book[] = [];
// renderBooks(booksData)
// fetchData() 
// filterBooks()
// populateFilters()
// handleSearch()