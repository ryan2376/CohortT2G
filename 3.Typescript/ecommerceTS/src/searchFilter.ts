// import { renderBooks } from "./cart";

// interface Book {
//     id: number;
//     title: string;
//     author: string;
//     genre: string;
//     year: number;
//     pages: number;
//     publisher: string;
//     description: string;
//     image: string;
// }

// let booksData: Book[] = [];



//     // Populate genre dropdown with unique genres
//     const populateFilters = () => {
//         const genres = [...new Set(booksData.map(book => book.genre))].sort();
//         const genreSelect = document.getElementById("genre-filter") as HTMLElement;
//         genres.forEach(genre => {
//             const option = document.createElement("option");
//             option.value = genre;
//             option.textContent = genre;
//             genreSelect.appendChild(option);
//         });

//         // Set min and max for year filter based on books
//         const years = booksData.map(book => book.year).sort((a:number, b:number) => a - b);
//         const yearFilter = document.getElementById("year-filter") as HTMLElement;
//         yearFilter.min = Math.min(...years)as HTMLSelectElement;
//         yearFilter.max = Math.max(...years);
//         yearFilter.value = Math.max(...years); // Default to most recent year
//         document.getElementById("year-value").textContent = Math.max(...years) as HTMLSelectElement;
//     };

//         // Filter books based on genre and year
//         const filterBooks = (): void => {
//             const genre = document.getElementById("genre-filter").value
//             const year = parseInt(document.getElementById("year-filter").value);
    
//             let filteredBooks = booksData;
    
//             if (genre) {
//                 filteredBooks = filteredBooks.filter(book => book.genre === genre);
//             }
    
//             if (year > 0) {
//                 filteredBooks = filteredBooks.filter(book => book.year <= year);
//             }
    
//             renderBooks(filteredBooks);
//         };
    
//         // Add event listeners for filters
//         document.getElementById("genre-filter").addEventListener("change", filterBooks);
//         document.getElementById("year-filter").addEventListener("input", () => {
//             const year = document.getElementById("year-filter").value;
//             document.getElementById("year-value").textContent = year;
//             filterBooks();
//         });
    
//         // Search functionality
//         document.getElementById("search-input").addEventListener("input", (e) => {
//             const query = e.target.value.toLowerCase();
//             const filteredBooks = booksData.filter((book) =>
//                 book.title.toLowerCase().includes(query)
//             );
//             renderBooks(filteredBooks);
//         });