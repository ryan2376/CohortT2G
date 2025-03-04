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
let booksData = []; // Global state (shared with index.ts, but you can pass it via return if preferred)
// Fetch data function with TypeScript types
export const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("http://localhost:3000/books");
        if (!response.ok)
            throw new Error("Network response was not ok");
        // Type the response data as an array of Books
        const data = yield response.json();
        booksData = data; // Store the fetched books globally (or return directly)
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