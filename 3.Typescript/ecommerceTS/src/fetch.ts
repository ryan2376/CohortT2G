import { renderBooks } from "./cart";

// export const fetchData = async () => {
//     try {
//         const response = await fetch("http://localhost:3000/books");
//         if (!response.ok) throw new Error("Network response was not ok");
//         booksData = await response.json();
//         renderBooks(booksData);
//         populateFilters();
//     } catch (error) {
//         console.log("Error fetching data:", error);
//         // Fallback: Use empty array or handle error gracefully
//         booksData = [];
//         renderBooks(booksData);
//     }
// };
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

// Fetch data function with TypeScript types
export const fetchData = async (): Promise<void> => {
    try {
        const response = await fetch("http://localhost:3000/books");
        if (!response.ok) throw new Error("Network response was not ok");
        
        // Type the response data as an array of Books
        const data: Book[] = await response.json();
        booksData = data; // Store the fetched books in booksData
        renderBooks(booksData)
        console.log("Fetched books:", booksData); // Log to verify the data
    } catch (error) {
        console.log("Error fetching data:", error);
        // Fallback: Use empty array, typed as Book[]
        booksData = [];
        renderBooks(booksData)
    }
};
