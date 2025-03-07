// src/displayBooks.ts

import { addToCart } from "./cart";
import { fetchData } from "./fetch";
import { renderBookDetails } from "./bookDetails";

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

// Render books function
export const renderBooks = (books: Book[]): void => {
    const productList = document.getElementById("product-list") as HTMLElement;
    if (!productList) {
        console.error("Product list element not found");
        return;
    }

    productList.innerHTML = ""; // Clear existing content to prevent duplicates

    books.forEach((book: Book) => {
        const template = document.getElementById("product-template") as HTMLTemplateElement;
        if (!template) {
            console.error("Product template not found");
            return;
        }

        const templateContent = template.content.cloneNode(true) as DocumentFragment;
        const productElement = templateContent.firstElementChild as HTMLElement;

        const productImage = productElement.querySelector(".product-image") as HTMLImageElement;
        productImage.src = book.image;
        productImage.alt = book.title;

        const productTitle = productElement.querySelector(".product-title") as HTMLElement;
        productTitle.textContent = book.title;

        const descriptionSpan = productElement.querySelector(".product-description span") as HTMLElement;
        descriptionSpan.textContent = `${book.title} by ${book.author} (${book.pages} pages)`;

        const addButton = productElement.querySelector(".add-to-cart") as HTMLButtonElement;
        addButton.onclick = () => addToCart(book);

        // Set the data-id attribute on the View Details button and attach event listener
        const viewButton = productElement.querySelector(".view-details") as HTMLButtonElement;
        if (viewButton) {
            viewButton.setAttribute("data-id", book.id.toString());
            viewButton.onclick = () => {
                const id = parseInt(viewButton.getAttribute("data-id") || "0", 10);
                console.log(`View Details clicked for book ID: ${id}`); // Debug: Confirm click
                window.history.pushState({ bookId: id }, "", `/book/${id}`);
                fetchBookDetails(id);
            };
        }

        productList.appendChild(productElement);
    });
};

// Function to fetch and render a specific book by ID
export const fetchBookDetails = async (id: number): Promise<void> => {
    console.log(`Fetching details for book ID: ${id}`); // Debug: Confirm function call
    try {
        const books = await fetchData({ id });
        console.log("Fetched books:", books); // Debug: Confirm fetch result
        if (books.length > 0) {
            renderBookDetails(books[0]); // Render the first (and only) book
        } else {
            renderBookDetails(null); // Handle not found case
        }
    } catch (error) {
        console.error("Error fetching book details:", error);
        renderBookDetails(null);
    }
};

// Export fetchData and renderBookDetails for use in other files
export { fetchData, renderBookDetails };