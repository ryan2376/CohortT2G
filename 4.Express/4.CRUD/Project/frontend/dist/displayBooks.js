// src/displayBooks.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addToCart } from "./cart";
import { fetchData, postBook } from "./fetch";
import { renderBookDetails } from "./bookDetails";
export const renderBooks = (books) => {
    const productList = document.getElementById("product-list");
    if (!productList) {
        console.error("Product list element not found");
        return;
    }
    productList.innerHTML = "";
    books.forEach((book) => {
        const template = document.getElementById("product-template");
        if (!template) {
            console.error("Product template not found");
            return;
        }
        const templateContent = template.content.cloneNode(true);
        const productElement = templateContent.firstElementChild;
        const productImage = productElement.querySelector(".product-image");
        productImage.src = book.image;
        productImage.alt = book.title;
        const productTitle = productElement.querySelector(".product-title");
        productTitle.textContent = book.title;
        const descriptionSpan = productElement.querySelector(".product-description span");
        descriptionSpan.textContent = `${book.title} by ${book.author} (${book.pages} pages)`;
        const addButton = productElement.querySelector(".add-to-cart");
        addButton.onclick = () => addToCart(book);
        const viewButton = productElement.querySelector(".view-details");
        if (viewButton) {
            viewButton.setAttribute("data-id", book.id.toString());
            viewButton.onclick = () => {
                const id = parseInt(viewButton.getAttribute("data-id") || "0", 10);
                console.log(`View Details clicked for book ID: ${id}`);
                window.history.pushState({ bookId: id }, "", `/book/${id}`);
                fetchBookDetails(id);
            };
        }
        productList.appendChild(productElement);
    });
};
export const fetchBookDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Fetching details for book ID: ${id}`);
    try {
        const books = yield fetchData({ id });
        console.log("Fetched books:", books);
        if (books.length > 0) {
            renderBookDetails(books[0]);
        }
        else {
            renderBookDetails(null);
        }
    }
    catch (error) {
        console.error("Error fetching book details:", error);
        renderBookDetails(null);
    }
});
export { fetchData, postBook, renderBookDetails };
//# sourceMappingURL=displayBooks.js.map