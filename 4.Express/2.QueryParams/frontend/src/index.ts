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
let cart: Book[] = []; // Shared cart state (you can move to cart.ts if preferred)

// Wait for DOM content to load, then initialize
document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Fetch data and wait for it to complete
        const data = await fetchData();
        booksData = data; // Store the fetched books

        // Render initial books
        renderBooks(booksData);

        // Set up filters and search
        populateFilters(booksData);
        filterBooks(booksData);
        handleSearch(booksData);

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
        filterBooks(booksData);
        handleSearch(booksData);
    }
});