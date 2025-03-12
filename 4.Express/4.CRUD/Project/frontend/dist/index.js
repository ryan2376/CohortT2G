var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderBooks, fetchBookDetails, renderBookDetails } from "./displayBooks";
import { fetchData, postBook } from './fetch';
import { clearCart, renderCart, updateCartBadge } from "./cart";
import { populateFilters, filterBooks, handleSearch } from "./searchFilter";
let booksData = [];
let cart = [];
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const initialData = yield fetchData({});
        booksData = initialData;
        renderBooks(booksData);
        yield populateFilters(booksData);
        yield filterBooks(undefined);
        yield handleSearch(booksData);
        window.booksData = booksData;
        // Post a Book Button
        const postButton = document.getElementById("post-book");
        const postBookSection = document.getElementById("post-book-section");
        const postBookForm = document.getElementById("post-book-form");
        const cancelPost = document.getElementById("cancel-post");
        if (postButton && postBookSection && postBookForm) {
            postButton.addEventListener("click", () => {
                postBookSection.style.display = postBookSection.style.display === "none" ? "block" : "none";
            });
            postBookForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
                e.preventDefault();
                const newBook = {
                    title: document.getElementById("post-title").value || "",
                    author: document.getElementById("post-author").value || "",
                    genre: document.getElementById("post-genre").value || "",
                    year: parseInt(document.getElementById("post-year").value) || 0,
                    pages: parseInt(document.getElementById("post-pages").value) || 0,
                    publisher: document.getElementById("post-publisher").value || "",
                    description: document.getElementById("post-description").value || "",
                    image: document.getElementById("post-image").value || "",
                    user_id: parseInt(document.getElementById("user-id").value) || 0,
                };
                try {
                    const postedBook = yield postBook(newBook);
                    booksData.push(postedBook);
                    renderBooks(booksData);
                    postBookForm.reset();
                    postBookSection.style.display = "none";
                    alert("Book posted successfully!");
                }
                catch (error) {
                    console.error("Failed to post book:", error);
                    alert("Failed to post book. Please try again.");
                }
            }));
            if (cancelPost) {
                cancelPost.addEventListener("click", () => {
                    postBookSection.style.display = "none";
                    postBookForm.reset();
                });
            }
        }
        const genreFilter = document.getElementById("genre-filter");
        const yearFilter = document.getElementById("year-filter");
        const searchInput = document.getElementById("search-input");
        if (genreFilter) {
            genreFilter.addEventListener("change", () => __awaiter(void 0, void 0, void 0, function* () {
                const genre = genreFilter.value;
                yield filterBooks(genre ? { genre } : undefined);
                const baseUrl = window.location.pathname;
                if (genre) {
                    window.history.pushState({}, "", `${baseUrl}?genre=${encodeURIComponent(genre)}`);
                }
                else {
                    window.history.pushState({}, "", baseUrl);
                }
            }));
        }
        if (yearFilter) {
            yearFilter.addEventListener("input", () => __awaiter(void 0, void 0, void 0, function* () {
                const year = yearFilter.value;
                yield filterBooks(year ? { year } : undefined);
                const yearValue = document.getElementById("year-value");
                if (yearValue)
                    yearValue.textContent = year;
                const baseUrl = window.location.pathname;
                if (year) {
                    window.history.pushState({}, "", `${baseUrl}?year=${encodeURIComponent(year)}`);
                }
                else {
                    window.history.pushState({}, "", baseUrl);
                }
            }));
        }
        if (searchInput) {
            searchInput.addEventListener("input", (e) => __awaiter(void 0, void 0, void 0, function* () {
                const input = e.target;
                const title = input.value.trim();
                yield filterBooks(title ? { title } : undefined);
                const baseUrl = window.location.pathname;
                if (title) {
                    window.history.pushState({}, "", `${baseUrl}?title=${encodeURIComponent(title)}`);
                }
                else {
                    window.history.pushState({}, "", baseUrl);
                }
            }));
        }
        window.addEventListener("popstate", (event) => __awaiter(void 0, void 0, void 0, function* () {
            const url = new URL(window.location.href);
            const path = window.location.pathname;
            if (path.startsWith("/book/")) {
                const bookId = parseInt(path.split("/book/")[1], 10);
                if (!isNaN(bookId)) {
                    yield fetchBookDetails(bookId);
                }
                else {
                    renderBookDetails(null);
                }
            }
            else {
                const title = url.searchParams.get("title");
                const genre = url.searchParams.get("genre");
                const year = url.searchParams.get("year");
                const queryParams = Object.assign(Object.assign(Object.assign({}, (title && { title })), (genre && { genre })), (year && { year }));
                const filteredData = yield fetchData({ queryParams });
                booksData = filteredData;
                window.booksData = booksData;
                renderBooks(filteredData);
                const bookDetailsSection = document.getElementById("book-details");
                const productList = document.getElementById("product-list");
                if (bookDetailsSection && productList) {
                    bookDetailsSection.style.display = "none";
                    productList.style.display = "flex";
                }
                if (searchInput)
                    searchInput.value = title || "";
                if (genreFilter)
                    genreFilter.value = genre || "";
                if (yearFilter) {
                    yearFilter.value = year || Math.max(...(booksData.map(book => book.year) || [0])).toString();
                    const yearValue = document.getElementById("year-value");
                    if (yearValue)
                        yearValue.textContent = yearFilter.value;
                }
            }
        }));
        const cartIcon = document.getElementById("cartIcon");
        const cartDropdown = document.getElementById("cartDropdown");
        if (cartIcon && cartDropdown) {
            cartIcon.addEventListener("click", () => {
                cartDropdown.classList.toggle("active");
            });
            document.addEventListener("click", (e) => {
                const target = e.target;
                if (!cartIcon.contains(target) && !cartDropdown.contains(target)) {
                    cartDropdown.classList.remove("active");
                }
            });
        }
        const clearCartButton = document.getElementById("clear-cart");
        if (clearCartButton) {
            clearCartButton.addEventListener("click", clearCart);
        }
    }
    catch (error) {
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
}));
//# sourceMappingURL=index.js.map