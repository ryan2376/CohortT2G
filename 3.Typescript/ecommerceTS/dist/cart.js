// Define the booksData and cart arrays with the Book type
// let booksData: Book[] = [];
let cart = [];
// Render books function (keeping it as is, but uncommenting add-to-cart)
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
        removeButton.onclick = () => removeFromCart(index);
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
// Toggle cart dropdown
const cartIcon = document.getElementById("cartIcon");
const cartDropdown = document.getElementById("cartDropdown");
if (cartIcon && cartDropdown) {
    cartIcon.addEventListener("click", () => {
        cartDropdown.classList.toggle("active");
    });
    // Close cart dropdown when clicking outside
    document.addEventListener("click", (e) => {
        const target = e.target;
        if (!cartIcon.contains(target) && !cartDropdown.contains(target)) {
            cartDropdown.classList.remove("active");
        }
    });
}
// Clear cart button
const clearCartButton = document.getElementById("clear-cart");
if (clearCartButton) {
    clearCartButton.addEventListener("click", clearCart);
}
//# sourceMappingURL=cart.js.map