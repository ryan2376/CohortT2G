var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let booksData = [];
export const fetchData = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let url = "http://localhost:3000/api/books";
        if (params.id !== undefined) {
            url += `/${params.id}`;
        }
        else if (params.queryParams) {
            const query = new URLSearchParams(params.queryParams).toString();
            url += `?${query}`;
        }
        console.log(`Fetching URL: ${url}`);
        const response = yield fetch(url);
        if (!response.ok)
            throw new Error(`Network response was not ok: ${response.statusText}`);
        const data = yield response.json();
        booksData = params.id !== undefined ? [data] : data;
        console.log("Fetched books:", booksData);
        return booksData;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        booksData = [];
        return [];
    }
});
export const postBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("http://localhost:3000/api/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book),
        });
        if (!response.ok)
            throw new Error("Failed to post book");
        const data = yield response.json();
        console.log("Posted book:", data);
        return data;
    }
    catch (error) {
        console.error("Error posting book:", error);
        throw error;
    }
});
// New function to delete a book
export const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`http://localhost:3000/api/books/${id}`, {
            method: "DELETE",
        });
        if (!response.ok)
            throw new Error("Failed to delete book");
        console.log("Book deleted successfully");
        // Refresh booksData after deletion
        booksData = yield fetchData({});
    }
    catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }
});
// New function to update a book
export const updateBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`http://localhost:3000/api/books/${book.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: book.title,
                author: book.author,
                genre: book.genre,
                year: book.year,
                pages: book.pages,
                publisher: book.publisher,
                description: book.description,
                image: book.image,
            }),
        });
        if (!response.ok)
            throw new Error("Failed to update book");
        console.log("Book updated successfully");
        // Refresh booksData after update
        booksData = yield fetchData({});
    }
    catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
});
//# sourceMappingURL=fetch.js.map