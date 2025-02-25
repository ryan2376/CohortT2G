var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderBooks } from "./cart";
let booksData = [];
// Fetch data function with TypeScript types
export const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("http://localhost:3000/books");
        if (!response.ok)
            throw new Error("Network response was not ok");
        // Type the response data as an array of Books
        const data = yield response.json();
        booksData = data; // Store the fetched books in booksData
        renderBooks(booksData);
        console.log("Fetched books:", booksData); // Log to verify the data
    }
    catch (error) {
        console.log("Error fetching data:", error);
        // Fallback: Use empty array, typed as Book[]
        booksData = [];
        renderBooks(booksData);
    }
});
//# sourceMappingURL=fetch.js.map