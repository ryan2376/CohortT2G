import { renderBooks } from "./cart";
import { fetchData } from "./fetch";
import { filterBooks, populateFilters } from "./searchFilter";
let booksData = [];
renderBooks(booksData);
fetchData();
filterBooks();
populateFilters();
//# sourceMappingURL=index.js.map