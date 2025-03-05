// src/searchFilter.ts

// Import renderBooks and fetchData, typed to accept an array of Books
import { renderBooks } from "./displayBooks";
import { fetchData } from "./fetch";

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

// Define booksData (shared or passed from index.ts)
let booksData: Book[] = [];

// Populate genre dropdown with unique genres and set up year filter
export const populateFilters = (data: Book[]): void => {
    booksData = data; // Update booksData with the passed data

    // Type genres as string[] explicitly
    const genres: string[] = [...new Set(booksData.map((book: Book) => book.genre))].sort();

    // Type genreSelect as HTMLSelectElement and handle null
    const genreSelect = document.getElementById("genre-filter") as HTMLSelectElement | null;
    if (!genreSelect) {
        console.error("Genre filter element not found");
        return;
    }

    // Clear existing options and add new ones, including "All Genres"
    genreSelect.innerHTML = '<option value="">All Genres</option>';
    genres.forEach((genre: string) => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreSelect.appendChild(option);
    });

    // Type years as number[] explicitly
    const years: number[] = booksData.map((book: Book) => book.year).sort((a: number, b: number) => a - b);

    // Type yearFilter as HTMLInputElement and handle null
    const yearFilter = document.getElementById("year-filter") as HTMLInputElement | null;
    if (!yearFilter) {
        console.error("Year filter element not found");
        return;
    }

    // Set min, max, and value for the year filter (convert numbers to strings for HTML attributes)
    yearFilter.min = Math.min(...(years.length ? years : [0])).toString(); // Default to 0 if years is empty
    yearFilter.max = Math.max(...(years.length ? years : [0])).toString(); // Default to 0 if years is empty
    yearFilter.value = Math.max(...(years.length ? years : [0])).toString(); // Default to most recent year

    // Type yearValue as HTMLElement and handle null
    const yearValue = document.getElementById("year-value") as HTMLElement | null;
    if (yearValue) {
        yearValue.textContent = yearFilter.value;
    }
};

// Filter books based on backend query params
export const filterBooks = async (queryParams?: { genre?: string; year?: string }): Promise<void> => {
    try {
        const data = await fetchData(queryParams); // Pass query params instead of Book[]
        booksData = data; // Update booksData with filtered results
        renderBooks(data);

        // Update URL with query params (optional, if you want filters in URL too)
        const baseUrl = window.location.pathname; // e.g., "/api/books"
        if (queryParams) {
            const params = new URLSearchParams({
                ...(queryParams.genre && { genre: queryParams.genre }),
                ...(queryParams.year && { year: queryParams.year }),
            }).toString();
            window.history.pushState({}, "", `${baseUrl}?${params}`);
        } else {
            window.history.pushState({}, "", baseUrl); // Reset to base URL if no params
        }
    } catch (error) {
        console.error("Error filtering books:", error);
        booksData = []; // Fallback to empty array
        renderBooks([]);
    }
};

// Search functionality using backend query params (optional, since index.ts handles it)
export const handleSearch = (data: Book[]): void => {
    booksData = data; // Update booksData with initial data

    // Type searchInput as HTMLInputElement and handle null
    const searchInput = document.getElementById("search-input") as HTMLInputElement | null;
    if (!searchInput) {
        console.error("Search input element not found");
        return;
    }

    searchInput.addEventListener("input", async (e: Event): Promise<void> => {
        const input = e.target as HTMLInputElement;
        const title = input.value.trim();
        const queryParams = title ? { title } : undefined;
        try {
            const filteredData = await fetchData(queryParams);
            booksData = filteredData;
            renderBooks(filteredData);

            // Update URL with query params
            const baseUrl = window.location.pathname; // e.g., "/api/books"
            if (queryParams && queryParams.title) {
                window.history.pushState(
                    { title: queryParams.title }, // State object (optional, for popstate)
                    "", // Title (optional, often empty)
                    `${baseUrl}?title=${encodeURIComponent(queryParams.title)}` // New URL
                );
            } else {
                window.history.pushState({}, "", baseUrl); // Reset to base URL if no title
            }
        } catch (error) {
            console.error("Error searching books:", error);
            booksData = []; // Fallback to empty array
            renderBooks([]);
        }
    });
};