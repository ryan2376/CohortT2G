var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Import renderBooks and fetchData, typed to accept an array of Books
import { renderBooks } from "./displayBooks";
import { fetchData } from "./fetch";
// Define booksData (shared or passed from index.ts)
let booksData = [];
// Populate genre dropdown with unique genres and set up year filter
export const populateFilters = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (initialData = []) {
    booksData = initialData; // Initialize with passed data (or empty array)
    // Fetch fresh data from the backend to ensure up-to-date filters
    try {
        const freshData = yield fetchData({}); // Fetch all books
        booksData = freshData;
    }
    catch (error) {
        console.error("Error fetching initial data for filters:", error);
        booksData = []; // Fallback to empty array
    }
    // Type genres as string[] explicitly
    const genres = [...new Set(booksData.map((book) => book.genre))].sort();
    // Type genreSelect as HTMLSelectElement and handle null
    const genreSelect = document.getElementById("genre-filter");
    if (!genreSelect) {
        console.error("Genre filter element not found");
        return;
    }
    // Clear existing options and add new ones, including "All Genres"
    genreSelect.innerHTML = '<option value="">All Genres</option>';
    genres.forEach((genre) => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreSelect.appendChild(option);
    });
    // Type years as number[] explicitly
    const years = booksData.map((book) => book.year).sort((a, b) => a - b);
    // Type yearFilter as HTMLInputElement and handle null
    const yearFilter = document.getElementById("year-filter");
    if (!yearFilter) {
        console.error("Year filter element not found");
        return;
    }
    // Set min, max, and value for the year filter (convert numbers to strings for HTML attributes)
    yearFilter.min = Math.min(...(years.length ? years : [0])).toString(); // Default to 0 if years is empty
    yearFilter.max = Math.max(...(years.length ? years : [0])).toString(); // Default to 0 if years is empty
    yearFilter.value = Math.max(...(years.length ? years : [0])).toString(); // Default to most recent year
    // Type yearValue as HTMLElement and handle null
    const yearValue = document.getElementById("year-value");
    if (yearValue) {
        yearValue.textContent = yearFilter.value;
    }
});
// Filter books based on backend query params
export const filterBooks = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fetchData({ queryParams }); // Fetch filtered data from backend
        booksData = data; // Update booksData with filtered results
        renderBooks(data);
        // Update URL with query params (optional, if you want filters in URL too)
        const baseUrl = window.location.pathname; // e.g., "/api/books"
        if (queryParams) {
            const params = new URLSearchParams(Object.assign(Object.assign(Object.assign({}, (queryParams.genre && { genre: queryParams.genre })), (queryParams.year && { year: queryParams.year })), (queryParams.title && { title: queryParams.title }))).toString();
            window.history.pushState({}, "", `${baseUrl}?${params}`);
        }
        else {
            window.history.pushState({}, "", baseUrl); // Reset to base URL if no params
        }
    }
    catch (error) {
        console.error("Error filtering books:", error);
        booksData = []; // Fallback to empty array
        renderBooks([]);
    }
});
// Search functionality using backend query params
export const handleSearch = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (data = []) {
    booksData = data; // Initialize with passed data (or empty array)
    // Type searchInput as HTMLInputElement and handle null
    const searchInput = document.getElementById("search-input");
    if (!searchInput) {
        console.error("Search input element not found");
        return;
    }
    searchInput.addEventListener("input", (e) => __awaiter(void 0, void 0, void 0, function* () {
        const input = e.target;
        const title = input.value.trim();
        const queryParams = title ? { title } : undefined;
        try {
            const filteredData = yield fetchData({ queryParams }); // Fetch search results from backend
            booksData = filteredData;
            renderBooks(filteredData);
            // Update URL with query params
            const baseUrl = window.location.pathname; // e.g., "/api/books"
            if (queryParams && queryParams.title) {
                window.history.pushState({ title: queryParams.title }, // State object (optional, for popstate)
                "", // Title (optional, often empty)
                `${baseUrl}?title=${encodeURIComponent(queryParams.title)}` // New URL
                );
            }
            else {
                window.history.pushState({}, "", baseUrl); // Reset to base URL if no title
            }
        }
        catch (error) {
            console.error("Error searching books:", error);
            booksData = []; // Fallback to empty array
            renderBooks([]);
        }
    }));
});
//# sourceMappingURL=searchFilter.js.map