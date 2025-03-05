import { addToCart } from "./cart";


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

    productList.innerHTML = "";

    books.forEach((book: Book) => {
        const template = document.getElementById("product-template") as HTMLTemplateElement;
        if (!template) {
            console.error("Product template not found");
            return;
        }

        const templateContent = template.content.cloneNode(true) as DocumentFragment;
        const productElement = templateContent.firstElementChild as HTMLElement;

        // Set the image source
        const productImage = productElement.querySelector(".product-image") as HTMLImageElement;
        productImage.src = book.image;
        productImage.alt = book.title; // Add alt text for accessibility

        // Set the title
        const productTitle = productElement.querySelector(".product-title") as HTMLElement;
        productTitle.textContent = book.title;

        // Set the description
        const descriptionSpan = productElement.querySelector(".product-description span") as HTMLElement;
        descriptionSpan.textContent = `${book.title} by ${book.author} (${book.pages} pages)`;

        // Set up the add-to-cart button
        const addButton = productElement.querySelector(".add-to-cart") as HTMLButtonElement;
        addButton.onclick = () => addToCart(book);

        productList.appendChild(productElement);
    });
};
