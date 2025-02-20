document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/products")
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById("product-list");
            const productTemplate = document.getElementById("product-template");

            products.forEach(product => {
                const productDiv = productTemplate.content.cloneNode(true).querySelector('.product');

                const productImage = productDiv.querySelector('.product-image');
                productImage.src = `${product.image}`;

                // Target elements using their classes
                const productName = productDiv.querySelector('.product-name');
                productName.textContent = product.name;

                const productDescription = productDiv.querySelector('.product-description span');
                productDescription.textContent = product.description;

                const productPrice = productDiv.querySelector('.product-price span');
                productPrice.textContent = `$${product.price}`;

                const productCategory = productDiv.querySelector('.product-category span');
                productCategory.textContent = product.category;

                const productStock = productDiv.querySelector('.product-stock span');
                productStock.textContent = `${product.stock} available`;

                productList.appendChild(productDiv);
            });
        })
        .catch(error => console.error("Error fetching products:", error));
});