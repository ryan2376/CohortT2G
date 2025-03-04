// src/fetch.ts

// Define the Book interface
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

let booksData: Book[] = []; // Global state (shared with index.ts, but you can pass it via return if preferred)

// Fetch data function with TypeScript types
export const fetchData = async (): Promise<Book[]> => {
    try {
        const response = await fetch("http://localhost:3000/books");
        if (!response.ok) throw new Error("Network response was not ok");

        // Type the response data as an array of Books
        const data: Book[] = await response.json();
        booksData = data; // Store the fetched books globally (or return directly)
        console.log("Fetched books:", booksData); // Log to verify the data
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        booksData = []; // Fallback to empty array
        return []; // Return empty array as fallback
    }
};