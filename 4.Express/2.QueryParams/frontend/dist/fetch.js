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
// Fetch data function with TypeScript types and query params
export const fetchData = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let url = "http://localhost:3000/api/books";
        if (queryParams) {
            const params = new URLSearchParams(queryParams).toString();
            url += `?${params}`;
        }
        const response = yield fetch(url);
        if (!response.ok)
            throw new Error(`Network response was not ok: ${response.statusText}`);
        const data = yield response.json();
        booksData = data; // Store the fetched books globally
        console.log("Fetched books:", booksData); // Log to verify the data
        return data;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        booksData = []; // Fallback to empty array
        return []; // Return empty array as fallback
    }
});
//# sourceMappingURL=fetch.js.map