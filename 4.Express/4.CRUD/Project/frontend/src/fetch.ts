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

// Fetch data function with TypeScript types and query/route params
export const fetchData = async (params: {
    id?: number; // Route param for specific book ID
    queryParams?: {
        title?: string;
        genre?: string;
        author?: string;
        year?: string;
    };
}): Promise<Book[]> => {
    try {
        let url = "http://localhost:3000/api/books";
        if (params.id !== undefined) {
            url += `/${params.id}`; // Route param for specific book (e.g., /api/books/3)
        } else if (params.queryParams) {
            const query = new URLSearchParams(params.queryParams).toString();
            url += `?${query}`; // Query params for filtering (e.g., ?title=The+Great+Gatsby)
        }
        console.log(`Fetching URL: ${url}`); // Debug: Log the URL being fetched
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
        const data = await response.json();
        // If fetching by ID, wrap the single book in an array for consistency
        booksData = params.id !== undefined ? [data] : data;
        console.log("Fetched books:", booksData); // Debug: Log the fetched data
        return booksData;
    } catch (error) {
        console.error("Error fetching data:", error);
        booksData = [];
        return [];
    }
};