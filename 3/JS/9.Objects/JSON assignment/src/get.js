document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/products")
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById("product-list");
            const productTemplate = document.getElementById("product-template");

            products.forEach(product => {
                // 1. Clone the template:
                const productDiv = productTemplate.content.cloneNode(true).querySelector('.product'); // Clone and get the .product element

                const productImage = productDiv.querySelector('.product-image')
                productImage.src = product.image
                productImage.alt = product.name;

                // 2. Populate the data (using querySelector within the cloned template):
                productDiv.querySelector('h2').textContent = product.name;
                productDiv.querySelector('.product-description').textContent = product.description; // Description
                productDiv.querySelector('.product-price').textContent = `$${product.price}`; // Price
                productDiv.querySelector('.product-category').textContent = product.category; // Category
                productDiv.querySelector('.product-stock').textContent = `${product.stock} available`; // Stock

                // 3. Add the filled product div to the list:
                productList.appendChild(productDiv);
            });
        })
        .catch(error => console.error("Error fetching products:", error));
});