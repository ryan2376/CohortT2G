// src/cart.ts

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

// Define the cart array with the Book type
let cart: Book[] = [];

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

// Add to cart
export const addToCart = (book: Book): void => {
    cart.push(book);
    renderCart();
    updateCartBadge();
};

// Remove from cart
export const removeFromCart = (index: number): void => {
    cart.splice(index, 1);
    renderCart();
    updateCartBadge();
};

// Clear cart
export const clearCart = (): void => {
    cart = [];
    renderCart();
    updateCartBadge();
};

// Render cart
export const renderCart = (): void => {
    const cartList = document.getElementById("cart-list") as HTMLElement;
    if (!cartList) {
        console.error("Cart list element not found");
        return;
    }

    cartList.innerHTML = "";

    cart.forEach((book: Book, index: number) => {
        const item = document.createElement("div");
        item.innerHTML = `
            <div class="cart-item">
                <img src="${book.image}" alt="${book.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <p class="cart-item-title">${book.title}</p>
                    <p>by ${book.author} (${book.pages} pages)</p>
                </div>
                <button class="remove-btn">Remove</button>
            </div>
        `;
        const removeButton = item.querySelector(".remove-btn") as HTMLButtonElement;
        removeButton.onclick = () => removeFromCart(index);
        cartList.appendChild(item);
    });
};

// Update cart badge
export const updateCartBadge = (): void => {
    const cartBadge = document.getElementById("cartBadge") as HTMLElement;
    if (!cartBadge) {
        console.error("Cart badge element not found");
        return;
    }
    cartBadge.textContent = cart.length.toString();
};