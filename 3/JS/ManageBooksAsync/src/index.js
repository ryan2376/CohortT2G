const fetchData = async () => {
    try {
        const response = await fetch("http://localhost:3000/books"); // Fetch all books
        const dataJson = await response.json();

        setTimeout(() => {
            const allBooks = dataJson.filter((bookObj) =>{
                return bookObj
            });
            console.log(allBooks); // Log all books
            // const summarisedBooks = allBooks.map((summarised) => {
            //     return (`📖 ${summarised.title} by ${summarised.author} (${summarised.pages} pages)`)
            // })
            // console.log(summarisedBooks);
            const filteredBooks = allBooks.filter((allBooks) => allBooks.year<1200)
            console.log(filteredBooks);
            processBooks(dataJson, specialBook);
        }, 2000);
        
    } catch (error) {
        console.log("Error fetching data:", error);
    }
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
// 
// 📖 1984 by George Orwell - Dystopian (328 pages)",



// title,author pages

// const  summarisedBooks = 