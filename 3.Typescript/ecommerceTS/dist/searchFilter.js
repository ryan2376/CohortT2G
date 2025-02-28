// Import renderBooks, typed to accept an array of Books
import { renderBooks } from "./cart";
// Define booksData (assuming it's shared or passed; we'll handle this in index.ts)
let booksData = [];
// Populate genre dropdown with unique genres and set up year filter
export const populateFilters = () => {
    // Type genres as string[] explicitly
    const genres = [...new Set(booksData.map((book) => book.genre))].sort();
    // Type genreSelect as HTMLSelectElement and handle null
    const genreSelect = document.getElementById("genre-filter");
    if (!genreSelect) {
        console.error("Genre filter element not found");
        return;
    }
    // Clear existing options and add new ones
    genreSelect.innerHTML = "";
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
};
// Filter books based on genre and year
export const filterBooks = (data) => {
    booksData = data; // Update booksData with the passed data (for consistency)
    // Type genreFilter as HTMLSelectElement and handle null
    const genreFilter = document.getElementById("genre-filter");
    if (!genreFilter) {
        console.error("Genre filter element not found");
        return;
    }
    // Type genre as string (value from select is always a string)
    const genre = genreFilter.value;
    // Type yearFilter as HTMLInputElement and handle null
    const yearFilter = document.getElementById("year-filter");
    if (!yearFilter) {
        console.error("Year filter element not found");
        return;
    }
    // Type year as number, defaulting to 0 if parseInt fails
    const year = parseInt(yearFilter.value) || 0;
    // Filter books based on genre and year
    let filteredBooks = booksData;
    if (genre) {
        filteredBooks = filteredBooks.filter((book) => book.genre === genre);
    }
    if (year > 0) {
        filteredBooks = filteredBooks.filter((book) => book.year <= year);
    }
    // Render the filtered books
    renderBooks(filteredBooks);
};
// Search functionality with proper event typing
export const handleSearch = (data) => {
    booksData = data; // Update booksData with the passed data
    // Type searchInput as HTMLInputElement and handle null
    const searchInput = document.getElementById("search-input");
    if (!searchInput) {
        console.error("Search input element not found");
        return;
    }
    searchInput.addEventListener("input", (e) => {
        const input = e.target;
        const query = input.value.toLowerCase();
        const filteredBooks = booksData.filter((book) => book.title.toLowerCase().includes(query));
        renderBooks(filteredBooks);
    });
};
//# sourceMappingURL=searchFilter.js.map