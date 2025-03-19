// src/bookDetails.ts
import { renderBooks } from "./displayBooks";
import { addToCart } from "./cart";
export const renderBookDetails = (book) => {
    console.log("Rendering book details for:", book); // Debug: Confirm function call
    const bookDetailsSection = document.getElementById("book-details");
    if (!bookDetailsSection) {
        console.error("Book details section not found");
        return;
    }
    const productList = document.getElementById("product-list");
    if (!productList) {
        console.error("Product list element not found");
        return;
    }
    if (!book) {
        bookDetailsSection.innerHTML = `<p>Book not found.</p>`;
        bookDetailsSection.style.display = "block";
        productList.style.display = "none";
        return;
    }
    bookDetailsSection.innerHTML = `
        <div class="book-details">
            <button class="back-btn">Back to List</button>
            <img src="${book.image}" alt="${book.title}" class="book-details-image" />
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
    // Show the details section, hide the book list
    bookDetailsSection.style.display = "block";
    productList.style.display = "none";
    // Add event listener for the back button
    const backButton = bookDetailsSection.querySelector(".back-btn");
    backButton.onclick = () => {
        window.history.pushState({}, "", "/");
        bookDetailsSection.style.display = "none";
        productList.style.display = "flex"; // Match your CSS layout
        // Re-render the full book list using global booksData
        const booksData = window.booksData || [];
        renderBooks(booksData);
    };
    // Add event listener for the "Add to Cart" button
    const addToCartButton = bookDetailsSection.querySelector(".add-to-cart");
    addToCartButton.onclick = () => {
        addToCart(book);
    };
};
// Export renderBooks for re-rendering the list
export { renderBooks } from "./displayBooks";
// Export fetchData for consistency
export { fetchData } from "./fetch";
//# sourceMappingURL=bookDetails.js.map