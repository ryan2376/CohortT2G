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
import { fetchData, deleteBook, updateBook } from "./fetch";
let booksData = [];
export const renderBooks = (books) => {
    booksData = books; // Update the global booksData
    const productList = document.getElementById("product-list");
    if (!productList) {
        console.error("Product list element not found");
        return;
    }
    productList.innerHTML = ""; // Clear the existing list
    books.forEach((book) => {
        const template = document.getElementById("product-template");
        if (!template) {
            console.error("Product template not found");
            return;
        }
        const templateContent = template.content.cloneNode(true);
        const productElement = templateContent.firstElementChild;
        const productImage = productElement.querySelector(".product-image");
        productImage.src = book.image || "default.jpg"; // Fallback image
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
                fetchBookDetails(id);
            };
        }
        // Delete Button
        const deleteButton = productElement.querySelector(".delete-book");
        if (deleteButton) {
            deleteButton.setAttribute("data-id", book.id.toString());
            deleteButton.onclick = () => __awaiter(void 0, void 0, void 0, function* () {
                if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
                    yield deleteBook(book.id);
                    renderBooks(yield fetchData({})); // Refresh the book list
                }
            });
        }
        // Update Button
        const updateButton = productElement.querySelector(".update-book");
        if (updateButton) {
            updateButton.setAttribute("data-id", book.id.toString());
            updateButton.onclick = () => showUpdateForm(book);
        }
        productList.appendChild(productElement);
    });
};
export const fetchBookDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`http://localhost:3000/api/books/${id}`);
        if (!response.ok)
            throw new Error("Failed to fetch book details");
        const book = yield response.json();
        renderBookDetails(book);
    }
    catch (error) {
        console.error("Error fetching book details:", error);
        renderBookDetails(null);
    }
});
export const renderBookDetails = (book) => {
    const bookDetailsSection = document.getElementById("book-details");
    const productList = document.getElementById("product-list");
    if (!bookDetailsSection || !productList) {
        console.error("Book details or product list element not found");
        return;
    }
    if (!book) {
        bookDetailsSection.style.display = "none";
        productList.style.display = "flex";
        return;
    }
    bookDetailsSection.innerHTML = `
        <div class="book-details">
            <button class="back-btn">Back to Books</button>
            <img src="${book.image || 'default.jpg'}" alt="${book.title}" class="book-details-image" />
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p><strong>Year:</strong> ${book.year}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Publisher:</strong> ${book.publisher}</p>
            <p><strong>Description:</strong> ${book.description}</p>
            <button class="add-to-cart">Add to Cart</button>
        </div>
    `;
    bookDetailsSection.style.display = "block";
    productList.style.display = "none";
    const backBtn = bookDetailsSection.querySelector(".back-btn");
    backBtn.onclick = () => {
        bookDetailsSection.style.display = "none";
        productList.style.display = "flex";
        window.history.pushState({}, "", "/");
    };
    const addToCartBtn = bookDetailsSection.querySelector(".add-to-cart");
    addToCartBtn.onclick = () => addToCart(book);
};
// New function to show and handle the update form
export const showUpdateForm = (book) => {
    const updateSection = document.getElementById("update-book-section");
    const updateForm = document.getElementById("update-book-form");
    const cancelUpdate = document.getElementById("cancel-update");
    if (updateSection && updateForm) {
        // Populate form with book data
        document.getElementById("update-id").value = book.id.toString();
        document.getElementById("update-title").value = book.title;
        document.getElementById("update-author").value = book.author || "";
        document.getElementById("update-genre").value = book.genre || "";
        document.getElementById("update-year").value = book.year.toString();
        document.getElementById("update-pages").value = book.pages.toString();
        document.getElementById("update-publisher").value = book.publisher || "";
        document.getElementById("update-description").value = book.description || "";
        document.getElementById("update-image").value = book.image || "";
        document.getElementById("update-user_id").value = book.user_id.toString();
        updateSection.style.display = "block";
        // Handle form submission
        updateForm.onsubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
            e.preventDefault();
            const updatedBook = {
                id: parseInt(document.getElementById("update-id").value),
                title: document.getElementById("update-title").value,
                author: document.getElementById("update-author").value,
                genre: document.getElementById("update-genre").value,
                year: parseInt(document.getElementById("update-year").value),
                pages: parseInt(document.getElementById("update-pages").value),
                publisher: document.getElementById("update-publisher").value,
                description: document.getElementById("update-description").value,
                image: document.getElementById("update-image").value,
                user_id: parseInt(document.getElementById("update-user_id").value)
            };
            try {
                yield updateBook(updatedBook);
                renderBooks(yield fetchData({})); // Refresh the book list
                updateSection.style.display = "none";
                updateForm.reset();
                alert("Book updated successfully!");
            }
            catch (error) {
                console.error("Failed to update book:", error);
                alert("Failed to update book. Please try again.");
            }
        });
        // Handle cancel button
        if (cancelUpdate) {
            cancelUpdate.onclick = () => {
                updateSection.style.display = "none";
                updateForm.reset();
            };
        }
    }
};
//# sourceMappingURL=displayBooks.js.map