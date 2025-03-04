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
let cart = []; // Shared cart state (you can move to cart.ts if preferred)
// Wait for DOM content to load, then initialize
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch data and wait for it to complete
        const data = yield fetchData();
        booksData = data; // Store the fetched books
        // Render initial books
        renderBooks(booksData);
        // Set up filters and search
        populateFilters(booksData);
        filterBooks(booksData);
        handleSearch(booksData);
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
        filterBooks(booksData);
        handleSearch(booksData);
    }
}));
//# sourceMappingURL=index.js.map