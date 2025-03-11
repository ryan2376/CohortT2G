import { renderBooks, fetchBookDetails, renderBookDetails } from "./displayBooks";
import {fetchData, postBook} from './fetch'
import { addToCart, removeFromCart, clearCart, renderCart, updateCartBadge } from "./cart";
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
        await populateFilters(booksData);
        await filterBooks(undefined);
        await handleSearch(booksData);

        (window as any).booksData = booksData;

        // Post a Book Button
        const postButton = document.getElementById("post-book") as HTMLButtonElement | null;
        const postBookSection = document.getElementById("post-book-section") as HTMLElement | null;
        const postBookForm = document.getElementById("post-book-form") as HTMLFormElement | null;
        const cancelPost = document.getElementById("cancel-post") as HTMLButtonElement | null;

        if (postButton && postBookSection && postBookForm) {
            postButton.addEventListener("click", () => {
                postBookSection.style.display = postBookSection.style.display === "none" ? "block" : "none";
            });

            postBookForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                const newBook = {
                    title: (document.getElementById("post-title") as HTMLInputElement).value || "",
                    author: (document.getElementById("post-author") as HTMLInputElement).value || "",
                    genre: (document.getElementById("post-genre") as HTMLInputElement).value || "",
                    year: parseInt((document.getElementById("post-year") as HTMLInputElement).value) || 0,
                    pages: parseInt((document.getElementById("post-pages") as HTMLInputElement).value) || 0,
                    publisher: (document.getElementById("post-publisher") as HTMLInputElement).value || "",
                    description: (document.getElementById("post-description") as HTMLTextAreaElement).value || "",
                    image: (document.getElementById("post-image") as HTMLInputElement).value || "",
                } as Omit<Book, "id">;

                try {
                    const postedBook = await postBook(newBook);
                    booksData.push(postedBook);
                    renderBooks(booksData);
                    postBookForm.reset();
                    postBookSection.style.display = "none";
                    alert("Book posted successfully!");
                } catch (error) {
                    console.error("Failed to post book:", error);
                    alert("Failed to post book. Please try again.");
                }
            });

            if (cancelPost) {
                cancelPost.addEventListener("click", () => {
                    postBookSection.style.display = "none";
                    postBookForm.reset();
                });
            }
        }

        const genreFilter = document.getElementById("genre-filter") as HTMLSelectElement | null;
        const yearFilter = document.getElementById("year-filter") as HTMLInputElement | null;
        const searchInput = document.getElementById("search-input") as HTMLInputElement | null;

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
                const yearValue = document.getElementById("year-value") as HTMLElement | null;
                if (yearValue) yearValue.textContent = year;
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
                await filterBooks(title ? { title } : undefined);
                const baseUrl = window.location.pathname;
                if (title) {
                    window.history.pushState({}, "", `${baseUrl}?title=${encodeURIComponent(title)}`);
                } else {
                    window.history.pushState({}, "", baseUrl);
                }
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

                const bookDetailsSection = document.getElementById("book-details") as HTMLElement | null;
                const productList = document.getElementById("product-list") as HTMLElement | null;
                if (bookDetailsSection && productList) {
                    bookDetailsSection.style.display = "none";
                    productList.style.display = "flex";
                }

                if (searchInput) searchInput.value = title || "";
                if (genreFilter) genreFilter.value = genre || "";
                if (yearFilter) {
                    yearFilter.value = year || Math.max(...(booksData.map(book => book.year) || [0])).toString();
                    const yearValue = document.getElementById("year-value") as HTMLElement | null;
                    if (yearValue) yearValue.textContent = yearFilter.value;
                }
            }
        });

        const cartIcon = document.getElementById("cartIcon") as HTMLElement | null;
        const cartDropdown = document.getElementById("cartDropdown") as HTMLElement | null;

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

        const clearCartButton = document.getElementById("clear-cart") as HTMLButtonElement | null;
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
        populateFilters(booksData).catch(console.error);
        filterBooks(undefined).catch(console.error);
        handleSearch(booksData).catch(console.error);
    }
});