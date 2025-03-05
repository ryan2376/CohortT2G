import { addToCart } from "./cart";
// Render books function
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
        // Set the image source
        const productImage = productElement.querySelector(".product-image");
        productImage.src = book.image;
        productImage.alt = book.title; // Add alt text for accessibility
        // Set the title
        const productTitle = productElement.querySelector(".product-title");
        productTitle.textContent = book.title;
        // Set the description
        const descriptionSpan = productElement.querySelector(".product-description span");
        descriptionSpan.textContent = `${book.title} by ${book.author} (${book.pages} pages)`;
        // Set up the add-to-cart button
        const addButton = productElement.querySelector(".add-to-cart");
        addButton.onclick = () => addToCart(book);
        productList.appendChild(productElement);
    });
};
//# sourceMappingURL=displayBooks.js.map