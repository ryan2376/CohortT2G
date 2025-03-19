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
        removeButton.addEventListener("click", (event: MouseEvent) => {
            event.stopPropagation(); // Prevent the click from bubbling up to the document
            removeFromCart(index);
        });
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