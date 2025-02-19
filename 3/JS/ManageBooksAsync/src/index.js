document.addEventListener("DOMContentLoaded", () => {
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/books"); // Fetch all books
            const books = await response.json();

            populateBooks(books); // Populate the book list
            processBooks(books, specialBook); // Process books with special checks

            setTimeout(() => {
                // Summarizing books
                const summarisedBooks = books.map(book => 
                    `📖 ${book.title} by ${book.author} (${book.pages} pages)`
                );
                console.log(summarisedBooks);

                // Filtering books published before 1950
                const filteredBooks = books.filter(book => book.year < 1950);
                console.log("Books before 1950:", filteredBooks);

                // Sorting books by year
                const sortedBooksYear = [...books].sort((a, b) => a.year - b.year);
                console.log("Sorted Books by Year:", sortedBooksYear);
            }, 2000);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    // Function to populate books in the UI
    const populateBooks = (books) => {
        const productList = document.getElementById("product-list");
        const productTemplate = document.getElementById("product-template");

        books.forEach(book => {
            const productDiv = productTemplate.content.cloneNode(true).querySelector(".product");

            const productImage = productDiv.querySelector(".product-image");
            productImage.src = book.image;
            productImage.alt = book.title; // Set alt text

            const productDescription = productDiv.querySelector(".product-description span");
            productDescription.textContent = `📖 ${book.title} by ${book.author} (${book.pages} pages)`;

            productList.appendChild(productDiv);
        });
    };

    // Callback function: Check for special books
    const specialBook = (book) => {
        if (book.pages > 500) {
            console.log(`⚠️ Warning: "${book.title}" is a long read (${book.pages} pages)!`);
        }
    };

    // Function that processes all books and calls the callback
    const processBooks = (books, callback) => {
        setTimeout(() => {
            console.log("🔍 Checking books...");
            books.forEach(book => callback(book)); // Loop through each book and apply callback
        }, 3000);
    };

    // Run the function
    fetchData();
});
