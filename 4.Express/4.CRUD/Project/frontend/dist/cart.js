// src/cart.ts
// Define the cart array with the Book type
let cart = [];
// Add to cart
export const addToCart = (book) => {
    cart.push(book);
    renderCart();
    updateCartBadge();
};
// Remove from cart
export const removeFromCart = (index) => {
    cart.splice(index, 1);
    renderCart();
    updateCartBadge();
};
// Clear cart
export const clearCart = () => {
    cart = [];
    renderCart();
    updateCartBadge();
};
// Render cart
export const renderCart = () => {
    const cartList = document.getElementById("cart-list");
    if (!cartList) {
        console.error("Cart list element not found");
        return;
    }
    cartList.innerHTML = "";
    cart.forEach((book, index) => {
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
        const removeButton = item.querySelector(".remove-btn");
        removeButton.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent the click from bubbling up to the document
            removeFromCart(index);
        });
        cartList.appendChild(item);
    });
};
// Update cart badge
export const updateCartBadge = () => {
    const cartBadge = document.getElementById("cartBadge");
    if (!cartBadge) {
        console.error("Cart badge element not found");
        return;
    }
    cartBadge.textContent = cart.length.toString();
};
//# sourceMappingURL=cart.js.map