// src/index.ts

import { renderBooks, fetchBookDetails, renderBookDetails } from "./displayBooks";
import { addToCart, removeFromCart, clearCart, renderCart, updateCartBadge } from "./cart";
import { fetchData } from "./fetch";
import { populateFilters, filterBooks, handleSearch } from "./searchFilter";

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

let booksData: Book[] = [];
let cart: Book[] = [];

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const initialData = await fetchData({});
        booksData = initialData;
        renderBooks(booksData);
        populateFilters(booksData);
        filterBooks(undefined);
        handleSearch(booksData);

        // Make booksData accessible globally for re-rendering after returning from details
        (window as any).booksData = booksData;

        const genreFilter = document.getElementById("genre-filter") as HTMLSelectElement;
        const yearFilter = document.getElementById("year-filter") as HTMLInputElement;
        const searchInput = document.getElementById("search-input") as HTMLInputElement;

        if (genreFilter) {
            genreFilter.addEventListener("change", async () => {
                const genre = genreFilter.value;
                await filterBooks(genre ? { genre } : undefined);
                const baseUrl = window.location.pathname;
                if (genre) {
                    window.history.pushState({}, "", `${baseUrl}?genre=${encodeURIComponent(genre)}`);
                } else {
                    window.history.pushState({}, "", baseUrl);
                }
            });
        }

        if (yearFilter) {
            yearFilter.addEventListener("input", async () => {
                const year = yearFilter.value;
                await filterBooks(year ? { year } : undefined);
                document.getElementById("year-value")!.textContent = year;
                const baseUrl = window.location.pathname;
                if (year) {
                    window.history.pushState({}, "", `${baseUrl}?year=${encodeURIComponent(year)}`);
                } else {
                    window.history.pushState({}, "", baseUrl);
                }
            });
        }

        if (searchInput) {
            searchInput.addEventListener("input", async (e: Event) => {
                const input = e.target as HTMLInputElement;
                const title = input.value.trim();
                const queryParams = title ? { title } : undefined;
                const baseUrl = window.location.pathname;
                if (queryParams && queryParams.title) {
                    window.history.pushState({ title: queryParams.title }, "", `${baseUrl}?title=${encodeURIComponent(queryParams.title)}`);
                } else {
                    window.history.pushState({}, "", baseUrl);
                }
                const filteredData = await fetchData({ queryParams });
                booksData = filteredData;
                (window as any).booksData = booksData;
                renderBooks(filteredData);
            });
        }

        window.addEventListener("popstate", async (event) => {
            const url = new URL(window.location.href);
            const path = window.location.pathname;

            if (path.startsWith("/book/")) {
                const bookId = parseInt(path.split("/book/")[1], 10);
                if (!isNaN(bookId)) {
                    await fetchBookDetails(bookId);
                } else {
                    renderBookDetails(null);
                }
            } else {
                const title = url.searchParams.get("title");
                const genre = url.searchParams.get("genre");
                const year = url.searchParams.get("year");
                const queryParams = { ...(title && { title }), ...(genre && { genre }), ...(year && { year }) };
                const filteredData = await fetchData({ queryParams });
                booksData = filteredData;
                (window as any).booksData = booksData;
                renderBooks(filteredData);

                const bookDetailsSection = document.getElementById("book-details") as HTMLElement;
                const productList = document.getElementById("product-list") as HTMLElement;
                if (bookDetailsSection && productList) {
                    bookDetailsSection.style.display = "none";
                    productList.style.display = "flex"; // Match your CSS layout
                }

                if (searchInput) searchInput.value = title || "";
                if (genreFilter) genreFilter.value = genre || "";
                if (yearFilter) {
                    yearFilter.value = year || Math.max(...(booksData.map(book => book.year) || [0])).toString();
                    document.getElementById("year-value")!.textContent = yearFilter.value;
                }
            }
        });

        const cartIcon = document.getElementById("cartIcon") as HTMLElement;
        const cartDropdown = document.getElementById("cartDropdown") as HTMLElement;

        if (cartIcon && cartDropdown) {
            cartIcon.addEventListener("click", (): void => {
                cartDropdown.classList.toggle("active");
            });

            document.addEventListener("click", (e: MouseEvent): void => {
                const target = e.target as HTMLElement;
                if (!cartIcon.contains(target) && !cartDropdown.contains(target)) {
                    cartDropdown.classList.remove("active");
                }
            });
        }

        const clearCartButton = document.getElementById("clear-cart") as HTMLButtonElement;
        if (clearCartButton) {
            clearCartButton.addEventListener("click", clearCart);
        }
    } catch (error) {
        console.error("Error initializing app:", error);
        booksData = [];
        cart = [];
        renderBooks(booksData);
        renderCart();
        updateCartBadge();
        populateFilters(booksData);
        filterBooks(undefined);
        handleSearch(booksData);
    }
});