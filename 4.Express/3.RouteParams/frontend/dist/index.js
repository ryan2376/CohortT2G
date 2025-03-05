// src/index.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Import necessary functions
import { renderBooks } from "./displayBooks";
import { clearCart, renderCart, updateCartBadge } from "./cart";
import { fetchData } from "./fetch";
import { populateFilters, filterBooks, handleSearch } from "./searchFilter";
// Define the booksData and cart arrays with the Book type
let booksData = [];
let cart = []; // Shared cart state
/// Wait for DOM content to load, then initialize
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all books initially (no query params)
        const initialData = yield fetchData(); // Fetches all books from /api/books
        booksData = initialData; // Store all books
        // Render initial books
        renderBooks(booksData);
        // Set up filters and search with query params
        populateFilters(booksData);
        filterBooks(undefined); // Initial load with no filters
        handleSearch(booksData);
        // Add event listeners for filters to use query params
        const genreFilter = document.getElementById("genre-filter");
        const yearFilter = document.getElementById("year-filter");
        const searchInput = document.getElementById("search-input");
        if (genreFilter) {
            genreFilter.addEventListener("change", () => __awaiter(void 0, void 0, void 0, function* () {
                const genre = genreFilter.value;
                yield filterBooks(genre ? { genre } : undefined);
                // Update URL with query params (optional, for filters)
                const baseUrl = window.location.pathname; // e.g., "/api/books"
                if (genre) {
                    window.history.pushState({}, "", `${baseUrl}?genre=${encodeURIComponent(genre)}`);
                }
                else {
                    window.history.pushState({}, "", baseUrl); // Reset to base URL if no genre
                }
            }));
        }
        if (yearFilter) {
            yearFilter.addEventListener("input", () => __awaiter(void 0, void 0, void 0, function* () {
                const year = yearFilter.value;
                yield filterBooks(year ? { year } : undefined);
                document.getElementById("year-value").textContent = year;
                // Update URL with query params (optional, for filters)
                const baseUrl = window.location.pathname; // e.g., "/api/books"
                if (year) {
                    window.history.pushState({}, "", `${baseUrl}?year=${encodeURIComponent(year)}`);
                }
                else {
                    window.history.pushState({}, "", baseUrl); // Reset to base URL if no year
                }
            }));
        }
        if (searchInput) {
            searchInput.addEventListener("input", (e) => __awaiter(void 0, void 0, void 0, function* () {
                const input = e.target;
                const title = input.value.trim();
                const queryParams = title ? { title } : undefined;
                // Update the URL with query params
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
                // Fetch and render filtered data
                const filteredData = yield fetchData(queryParams);
                booksData = filteredData;
                renderBooks(filteredData);
            }));
        }
        // Optional: Handle URL changes (back/forward navigation)
        window.addEventListener("popstate", () => __awaiter(void 0, void 0, void 0, function* () {
            const url = new URL(window.location.href);
            const title = url.searchParams.get("title");
            const genre = url.searchParams.get("genre");
            const year = url.searchParams.get("year");
            const queryParams = Object.assign(Object.assign(Object.assign({}, (title && { title })), (genre && { genre })), (year && { year }));
            // Fetch and render data based on URL query params
            const filteredData = yield fetchData(queryParams);
            booksData = filteredData;
            renderBooks(filteredData);
            // Update UI to reflect URL
            if (searchInput)
                searchInput.value = title || "";
            if (genreFilter)
                genreFilter.value = genre || "";
            if (yearFilter) {
                yearFilter.value = year || Math.max(...(booksData.map(book => book.year) || [0])).toString();
                document.getElementById("year-value").textContent = yearFilter.value;
            }
        }));
        // Cart initialization (event listeners)
        // Toggle cart dropdown
        const cartIcon = document.getElementById("cartIcon");
        const cartDropdown = document.getElementById("cartDropdown");
        if (cartIcon && cartDropdown) {
            cartIcon.addEventListener("click", () => {
                cartDropdown.classList.toggle("active");
            });
            // Close cart dropdown when clicking outside
            document.addEventListener("click", (e) => {
                const target = e.target;
                if (!cartIcon.contains(target) && !cartDropdown.contains(target)) {
                    cartDropdown.classList.remove("active");
                }
            });
        }
        // Clear cart button
        const clearCartButton = document.getElementById("clear-cart");
        if (clearCartButton) {
            clearCartButton.addEventListener("click", clearCart);
        }
    }
    catch (error) {
        console.error("Error initializing app:", error);
        booksData = []; // Fallback to empty array
        cart = []; // Ensure cart is also empty on error
        // Render empty lists
        renderBooks(booksData);
        renderCart(); // Render empty cart
        updateCartBadge(); // Update badge to 0
        // Set up filters and search with empty data
        populateFilters(booksData);
        filterBooks(undefined);
        handleSearch(booksData);
    }
}));
//# sourceMappingURL=index.js.map