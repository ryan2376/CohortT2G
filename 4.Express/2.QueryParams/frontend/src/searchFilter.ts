// src/searchFilter.ts

// Import renderBooks, typed to accept an array of Books
import { renderBooks } from "./displayBooks";

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

    // Add event listeners for filters
    setupFilterEvents();
};

// Filter books based on genre and year
export const filterBooks = (data: Book[]): void => {
    booksData = data; // Update booksData with the passed data

    // Type genreFilter as HTMLSelectElement and handle null
    const genreFilter = document.getElementById("genre-filter") as HTMLSelectElement | null;
    if (!genreFilter) {
        console.error("Genre filter element not found");
        return;
    }

    // Type genre as string (value from select is always a string)
    const genre: string = genreFilter.value;

    // Type yearFilter as HTMLInputElement and handle null
    const yearFilter = document.getElementById("year-filter") as HTMLInputElement | null;
    if (!yearFilter) {
        console.error("Year filter element not found");
        return;
    }

    // Type year as number, defaulting to 0 if parseInt fails
    const year: number = parseInt(yearFilter.value) || 0;

    // Filter books based on genre and year
    let filteredBooks: Book[] = booksData;

    if (genre) {
        filteredBooks = filteredBooks.filter((book: Book) => book.genre === genre);
    }

    if (year > 0) {
        filteredBooks = filteredBooks.filter((book: Book) => book.year <= year);
    }

    // Render the filtered books
    renderBooks(filteredBooks);
};

// Search functionality with proper event typing
export const handleSearch = (data: Book[]): void => {
    booksData = data; // Update booksData with the passed data

    // Type searchInput as HTMLInputElement and handle null
    const searchInput = document.getElementById("search-input") as HTMLInputElement | null;
    if (!searchInput) {
        console.error("Search input element not found");
        return;
    }

    searchInput.addEventListener("input", (e: Event): void => {
        const input = e.target as HTMLInputElement;
        const query: string = input.value.toLowerCase();
        const filteredBooks: Book[] = booksData.filter((book: Book) =>
            book.title.toLowerCase().includes(query)
        );
        renderBooks(filteredBooks);
    });
};

// Helper function to set up filter event listeners
const setupFilterEvents = (): void => {
    const genreFilter = document.getElementById("genre-filter") as HTMLSelectElement | null;
    const yearFilter = document.getElementById("year-filter") as HTMLInputElement | null;

    if (genreFilter) {
        genreFilter.addEventListener("change", (e: Event): void => {
            filterBooks(booksData);
        });
    }

    if (yearFilter) {
        yearFilter.addEventListener("input", (e: Event): void => {
            const yearValue = document.getElementById("year-value") as HTMLElement | null;
            if (yearValue) {
                yearValue.textContent = (e.target as HTMLInputElement).value;
            }
            filterBooks(booksData);
        });
    }
};