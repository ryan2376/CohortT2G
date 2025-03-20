// displayBooks.ts
import { addToCart } from "./cart";
import { fetchData, postBook, deleteBook, updateBook } from "./fetch";

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
    user_id: number;
}

let booksData: Book[] = [];

export const renderBooks = (books: Book[]): void => {
    booksData = books; // Update the global booksData
    const productList = document.getElementById("product-list") as HTMLElement;
    if (!productList) {
        console.error("Product list element not found");
        return;
    }

    productList.innerHTML = ""; // Clear the existing list

    books.forEach((book: Book) => {
        const template = document.getElementById("product-template") as HTMLTemplateElement;
        if (!template) {
            console.error("Product template not found");
            return;
        }

        const templateContent = template.content.cloneNode(true) as DocumentFragment;
        const productElement = templateContent.firstElementChild as HTMLElement;

        const productImage = productElement.querySelector(".product-image") as HTMLImageElement;
        productImage.src = book.image || "default.jpg"; // Fallback image
        productImage.alt = book.title;

        const productTitle = productElement.querySelector(".product-title") as HTMLElement;
        productTitle.textContent = book.title;

        const descriptionSpan = productElement.querySelector(".product-description span") as HTMLElement;
        descriptionSpan.textContent = `${book.title} by ${book.author} (${book.pages} pages)`;

        const addButton = productElement.querySelector(".add-to-cart") as HTMLButtonElement;
        addButton.onclick = () => addToCart(book);

        const viewButton = productElement.querySelector(".view-details") as HTMLButtonElement;
        if (viewButton) {
            viewButton.setAttribute("data-id", book.id.toString());
            viewButton.onclick = () => {
                const id = parseInt(viewButton.getAttribute("data-id") || "0", 10);
                fetchBookDetails(id);
            };
        }

        // Delete Button
        const deleteButton = productElement.querySelector(".delete-book") as HTMLButtonElement;
        if (deleteButton) {
            deleteButton.setAttribute("data-id", book.id.toString());
            deleteButton.onclick = async () => {
                if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
                    await deleteBook(book.id);
                    renderBooks(await fetchData({})); // Refresh the book list
                }
            };
        }

        // Update Button
        const updateButton = productElement.querySelector(".update-book") as HTMLButtonElement;
        if (updateButton) {
            updateButton.setAttribute("data-id", book.id.toString());
            updateButton.onclick = () => showUpdateForm(book);
        }

        productList.appendChild(productElement);
    });
};

export const fetchBookDetails = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:3000/api/books/${id}`);
        if (!response.ok) throw new Error("Failed to fetch book details");
        const book: Book = await response.json();
        renderBookDetails(book);
    } catch (error) {
        console.error("Error fetching book details:", error);
        renderBookDetails(null);
    }
};

export const renderBookDetails = (book: Book | null): void => {
    const bookDetailsSection = document.getElementById("book-details") as HTMLElement;
    const productList = document.getElementById("product-list") as HTMLElement;
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

    const backBtn = bookDetailsSection.querySelector(".back-btn") as HTMLButtonElement;
    backBtn.onclick = () => {
        bookDetailsSection.style.display = "none";
        productList.style.display = "flex";
        window.history.pushState({}, "", "/");
    };

    const addToCartBtn = bookDetailsSection.querySelector(".add-to-cart") as HTMLButtonElement;
    addToCartBtn.onclick = () => addToCart(book);
};

// New function to show and handle the update form
export const showUpdateForm = (book: Book): void => {
    const updateSection = document.getElementById("update-book-section") as HTMLElement;
    const updateForm = document.getElementById("update-book-form") as HTMLFormElement;
    const cancelUpdate = document.getElementById("cancel-update") as HTMLButtonElement;

    if (updateSection && updateForm) {
        // Populate form with book data
        (document.getElementById("update-id") as HTMLInputElement).value = book.id.toString();
        (document.getElementById("update-title") as HTMLInputElement).value = book.title;
        (document.getElementById("update-author") as HTMLInputElement).value = book.author || "";
        (document.getElementById("update-genre") as HTMLInputElement).value = book.genre || "";
        (document.getElementById("update-year") as HTMLInputElement).value = book.year.toString();
        (document.getElementById("update-pages") as HTMLInputElement).value = book.pages.toString();
        (document.getElementById("update-publisher") as HTMLInputElement).value = book.publisher || "";
        (document.getElementById("update-description") as HTMLTextAreaElement).value = book.description || "";
        (document.getElementById("update-image") as HTMLInputElement).value = book.image || "";
        (document.getElementById("update-user_id") as HTMLInputElement).value = book.user_id.toString();

        updateSection.style.display = "block";

        // Handle form submission
        updateForm.onsubmit = async (e) => {
            e.preventDefault();
            const updatedBook = {
                id: parseInt((document.getElementById("update-id") as HTMLInputElement).value),
                title: (document.getElementById("update-title") as HTMLInputElement).value,
                author: (document.getElementById("update-author") as HTMLInputElement).value,
                genre: (document.getElementById("update-genre") as HTMLInputElement).value,
                year: parseInt((document.getElementById("update-year") as HTMLInputElement).value),
                pages: parseInt((document.getElementById("update-pages") as HTMLInputElement).value),
                publisher: (document.getElementById("update-publisher") as HTMLInputElement).value,
                description: (document.getElementById("update-description") as HTMLTextAreaElement).value,
                image: (document.getElementById("update-image") as HTMLInputElement).value,
                user_id: parseInt((document.getElementById("update-user_id") as HTMLInputElement).value)
            };

            try {
                await updateBook(updatedBook);
                renderBooks(await fetchData({})); // Refresh the book list
                updateSection.style.display = "none";
                updateForm.reset();
                alert("Book updated successfully!");
            } catch (error) {
                console.error("Failed to update book:", error);
                alert("Failed to update book. Please try again.");
            }
        };

        // Handle cancel button
        if (cancelUpdate) {
            cancelUpdate.onclick = () => {
                updateSection.style.display = "none";
                updateForm.reset();
            };
        }
    }
};