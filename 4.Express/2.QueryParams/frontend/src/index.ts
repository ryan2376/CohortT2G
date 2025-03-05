// src/index.ts

// Import necessary functions
import { renderBooks } from "./displayBooks";
import { addToCart, removeFromCart, clearCart, renderCart, updateCartBadge } from "./cart";
import { fetchData } from "./fetch";
import { populateFilters, filterBooks, handleSearch } from "./searchFilter";
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

// Define the booksData and cart arrays with the Book type
let booksData: Book[] = [];
let cart: Book[] = []; // Shared cart state

/// Wait for DOM content to load, then initialize
document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Fetch all books initially (no query params)
        const initialData = await fetchData(); // Fetches all books from /api/books
        booksData = initialData; // Store all books

        // Render initial books
        renderBooks(booksData);

        // Set up filters and search with query params
        populateFilters(booksData);
        filterBooks(undefined); // Initial load with no filters
        handleSearch(booksData);

        // Add event listeners for filters to use query params
        const genreFilter = document.getElementById("genre-filter") as HTMLSelectElement;
        const yearFilter = document.getElementById("year-filter") as HTMLInputElement;
        const searchInput = document.getElementById("search-input") as HTMLInputElement;

        if (genreFilter) {
            genreFilter.addEventListener("change", async () => {
                const genre = genreFilter.value;
                await filterBooks(genre ? { genre } : undefined);

                // Update URL with query params (optional, for filters)
                const baseUrl = window.location.pathname; // e.g., "/api/books"
                if (genre) {
                    window.history.pushState({}, "", `${baseUrl}?genre=${encodeURIComponent(genre)}`);
                } else {
                    window.history.pushState({}, "", baseUrl); // Reset to base URL if no genre
                }
            });
        }

        if (yearFilter) {
            yearFilter.addEventListener("input", async () => {
                const year = yearFilter.value;
                await filterBooks(year ? { year } : undefined);
                document.getElementById("year-value")!.textContent = year;

                // Update URL with query params (optional, for filters)
                const baseUrl = window.location.pathname; // e.g., "/api/books"
                if (year) {
                    window.history.pushState({}, "", `${baseUrl}?year=${encodeURIComponent(year)}`);
                } else {
                    window.history.pushState({}, "", baseUrl); // Reset to base URL if no year
                }
            });
        }

        if (searchInput) {
            searchInput.addEventListener("input", async (e: Event) => {
                const input = e.target as HTMLInputElement;
                const title = input.value.trim();
                const queryParams = title ? { title } : undefined;

                // Update the URL with query params
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

                // Fetch and render filtered data
                const filteredData = await fetchData(queryParams);
                booksData = filteredData;
                renderBooks(filteredData);
            });
        }

        // Optional: Handle URL changes (back/forward navigation)
        window.addEventListener("popstate", async () => {
            const url = new URL(window.location.href);
            const title = url.searchParams.get("title");
            const genre = url.searchParams.get("genre");
            const year = url.searchParams.get("year");
            const queryParams = {
                ...(title && { title }),
                ...(genre && { genre }),
                ...(year && { year }),
            };

            // Fetch and render data based on URL query params
            const filteredData = await fetchData(queryParams);
            booksData = filteredData;
            renderBooks(filteredData);

            // Update UI to reflect URL
            if (searchInput) searchInput.value = title || "";
            if (genreFilter) genreFilter.value = genre || "";
            if (yearFilter) {
                yearFilter.value = year || Math.max(...(booksData.map(book => book.year) || [0])).toString();
                document.getElementById("year-value")!.textContent = yearFilter.value;
            }
        });

        // Cart initialization (event listeners)
        // Toggle cart dropdown
        const cartIcon = document.getElementById("cartIcon") as HTMLElement;
        const cartDropdown = document.getElementById("cartDropdown") as HTMLElement;

        if (cartIcon && cartDropdown) {
            cartIcon.addEventListener("click", (): void => {
                cartDropdown.classList.toggle("active");
            });

            // Close cart dropdown when clicking outside
            document.addEventListener("click", (e: MouseEvent): void => {
                const target = e.target as HTMLElement;
                if (!cartIcon.contains(target) && !cartDropdown.contains(target)) {
                    cartDropdown.classList.remove("active");
                }
            });
        }

        // Clear cart button
        const clearCartButton = document.getElementById("clear-cart") as HTMLButtonElement;
        if (clearCartButton) {
            clearCartButton.addEventListener("click", clearCart);
        }
    } catch (error) {
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
});