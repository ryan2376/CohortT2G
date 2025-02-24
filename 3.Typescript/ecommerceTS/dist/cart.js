let booksData = [];
// let cart: { id: number; name: string; price: number }[] = [];
// export     // Add to cart
// const addToCart = (book:) => {
//     cart.push(book);
//     renderCart();
//     updateCartBadge();
// };
// // Remove from cart
// const removeFromCart = (index) => {
//     cart.splice(index, 1);
//     renderCart();
//     updateCartBadge();
// };
// // Clear cart
// const clearCart = () => {
//     cart = [];
//     renderCart();
//     updateCartBadge();
// };
// const renderCart = () => {
//     const cartList = document.getElementById("cart-list");
//     cartList.innerHTML = "";
//     cart.forEach((book, index) => {
//         const item = document.createElement("div");
//         item.innerHTML = `
//             <div class="cart-item">
//                 <img src="${book.image}" alt="${book.title}" class="cart-item-image">
//                 <div class="cart-item-details">
//                     <p class="cart-item-title">${book.title}</p>
//                     <p>by ${book.author} (${book.pages} pages)</p>
//                 </div>
//                 <button class="remove-btn">Remove</button>
//             </div>
//         `;
//         item.querySelector(".remove-btn").onclick = () => removeFromCart(index);
//         cartList.appendChild(item);
//     });
// };
//    // Update cart badge
// const updateCartBadge = () => {
//     document.getElementById("cartBadge").textContent = cart.length;
// };
// // Toggle cart dropdown
// const cartIcon = document.getElementById("cartIcon");
// const cartDropdown = document.getElementById("cartDropdown");
// cartIcon.addEventListener("click", () => {
//     cartDropdown.classList.toggle("active");
// });
// // Close cart dropdown when clicking outside
// document.addEventListener("click", (e) => {
//     if (!cartIcon.contains(e.target) && !cartDropdown.contains(e.target)) {
//         cartDropdown.classList.remove("active");
//     }
// });
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
        // const addButton = productElement.querySelector(".add-to-cart") as HTMLButtonElement;
        // addButton.onclick = () => addToCart(book);
        productList.appendChild(productElement);
    });
};
//# sourceMappingURL=cart.js.map