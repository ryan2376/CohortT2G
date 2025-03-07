// src/fetch.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let booksData = []; // Global state (shared with index.ts)
// Fetch data function with TypeScript types and query/route params
export const fetchData = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let url = "http://localhost:3000/api/books";
        if (params.id !== undefined) {
            url += `/${params.id}`; // Route param for specific book (e.g., /api/books/3)
        }
        else if (params.queryParams) {
            const query = new URLSearchParams(params.queryParams).toString();
            url += `?${query}`; // Query params for filtering (e.g., ?title=The+Great+Gatsby)
        }
        console.log(`Fetching URL: ${url}`); // Debug: Log the URL being fetched
        const response = yield fetch(url);
        if (!response.ok)
            throw new Error(`Network response was not ok: ${response.statusText}`);
        const data = yield response.json();
        // If fetching by ID, wrap the single book in an array for consistency
        booksData = params.id !== undefined ? [data] : data;
        console.log("Fetched books:", booksData); // Debug: Log the fetched data
        return booksData;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        booksData = [];
        return [];
    }
});
//# sourceMappingURL=fetch.js.map