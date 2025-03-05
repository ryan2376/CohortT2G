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

let booksData: Book[] = []; // Global state (shared with index.ts)

// Fetch data function with TypeScript types and query params
export const fetchData = async (queryParams?: {
    title?: string;
    genre?: string;
    author?: string;
    year?: string; // Added year as an optional query parameter
}): Promise<Book[]> => {
    try {
        let url = "http://localhost:3000/api/books";
        if (queryParams) {
            const params = new URLSearchParams(queryParams).toString();
            url += `?${params}`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
        const data: Book[] = await response.json();
        booksData = data; // Store the fetched books globally
        console.log("Fetched books:", booksData); // Log to verify the data
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        booksData = []; // Fallback to empty array
        return []; // Return empty array as fallback
    }
};