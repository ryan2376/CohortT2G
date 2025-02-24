document.addEventListener("DOMContentLoaded", () => {
    let booksData = [];
    let cart = [];

    // Fetch books data from db.json
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/books");
            if (!response.ok) throw new Error("Network response was not ok");
            booksData = await response.json();
            renderBooks(booksData);
            populateFilters();
        } catch (error) {
            console.log("Error fetching data:", error);
            // Fallback: Use empty array or handle error gracefully
            booksData = [];
            renderBooks(booksData);
        }
    };

    // Populate genre dropdown with unique genres
    const populateFilters = () => {
        const genres = [...new Set(booksData.map(book => book.genre))].sort();
        const genreSelect = document.getElementById("genre-filter");
        genres.forEach(genre => {
            const option = document.createElement("option");
            option.value = genre;
            option.textContent = genre;
            genreSelect.appendChild(option);
        });

        // Set min and max for year filter based on books
        const years = booksData.map(book => book.year).sort((a, b) => a - b);
        const yearFilter = document.getElementById("year-filter");
        yearFilter.min = Math.min(...years);
        yearFilter.max = Math.max(...years);
        yearFilter.value = Math.max(...years); // Default to most recent year
        document.getElementById("year-value").textContent = Math.max(...years);
    };

    // Add to cart
    const addToCart = (book) => {
        cart.push(book);
        renderCart();
        updateCartBadge();
    };

    // Remove from cart
    const removeFromCart = (index) => {
        cart.splice(index, 1);
        renderCart();
        updateCartBadge();
    };

    // Clear cart
    const clearCart = () => {
        cart = [];
        renderCart();
        updateCartBadge();
    };

    // Render books with filters
    const renderBooks = (books) => {
        const productList = document.getElementById("product-list");
        productList.innerHTML = "";

        books.forEach((book) => {
            const template = document.getElementById("product-template").content.cloneNode(true);
            template.querySelector(".product-image").src = book.image;
            template.querySelector(".product-title").textContent = book.title;
            template.querySelector(".product-description span").textContent = `${book.title} by ${book.author} (${book.pages} pages)`;

            const addButton = template.querySelector(".add-to-cart");
            addButton.onclick = () => addToCart(book);

            productList.appendChild(template);
        });
    };

    // Render cart (updated to include image and title)
    const renderCart = () => {
        const cartList = document.getElementById("cart-list");
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
            item.querySelector(".remove-btn").onclick = () => removeFromCart(index);
            cartList.appendChild(item);
        });
    };

    // Update cart badge
    const updateCartBadge = () => {
        document.getElementById("cartBadge").textContent = cart.length;
    };

    // Toggle cart dropdown
    const cartIcon = document.getElementById("cartIcon");
    const cartDropdown = document.getElementById("cartDropdown");

    cartIcon.addEventListener("click", () => {
        cartDropdown.classList.toggle("active");
    });

    // Close cart dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!cartIcon.contains(e.target) && !cartDropdown.contains(e.target)) {
            cartDropdown.classList.remove("active");
        }
    });

    // Filter books based on genre and year
    const filterBooks = () => {
        const genre = document.getElementById("genre-filter").value;
        const year = parseInt(document.getElementById("year-filter").value);

        let filteredBooks = booksData;

        if (genre) {
            filteredBooks = filteredBooks.filter(book => book.genre === genre);
        }

        if (year > 0) {
            filteredBooks = filteredBooks.filter(book => book.year <= year);
        }

        renderBooks(filteredBooks);
    };

    // Add event listeners for filters
    document.getElementById("genre-filter").addEventListener("change", filterBooks);
    document.getElementById("year-filter").addEventListener("input", () => {
        const year = document.getElementById("year-filter").value;
        document.getElementById("year-value").textContent = year;
        filterBooks();
    });

    // Search functionality
    document.getElementById("search-input").addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const filteredBooks = booksData.filter((book) =>
            book.title.toLowerCase().includes(query)
        );
        renderBooks(filteredBooks);
    });

    // Clear cart button
    document.getElementById("clear-cart").addEventListener("click", clearCart);

    // Initialize
    fetchData();
});