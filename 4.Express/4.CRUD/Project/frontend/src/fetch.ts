interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    year: number;
    pages: number;
    publisher: string;
    description: string;
    image: string;
    user_id: number;
}

let booksData: Book[] = [];

export const fetchData = async (params: {
    id?: number;
    queryParams?: { title?: string; genre?: string; author?: string; year?: string };
}): Promise<Book[]> => {
    try {
        let url = "http://localhost:3000/api/books";
        if (params.id !== undefined) {
            url += `/${params.id}`;
        } else if (params.queryParams) {
            const query = new URLSearchParams(params.queryParams).toString();
            url += `?${query}`;
        }
        console.log(`Fetching URL: ${url}`);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
        const data = await response.json();
        booksData = params.id !== undefined ? [data] : data;
        console.log("Fetched books:", booksData);
        return booksData;
    } catch (error) {
        console.error("Error fetching data:", error);
        booksData = [];
        return [];
    }
};

export const postBook = async (book: Omit<Book, "id">): Promise<Book> => {
    try {
        const response = await fetch("http://localhost:3000/api/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book),
        });
        if (!response.ok) throw new Error("Failed to post book");
        const data = await response.json();
        console.log("Posted book:", data);
        return data;
    } catch (error) {
        console.error("Error posting book:", error);
        throw error;
    }
};

// New function to delete a book
export const deleteBook = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:3000/api/books/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete book");
        console.log("Book deleted successfully");
        // Refresh booksData after deletion
        booksData = await fetchData({});
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }
};

// New function to update a book
export const updateBook = async (book: Book): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:3000/api/books/${book.id}`, {
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
                user_id: book.user_id
            }),
        });
        if (!response.ok) throw new Error("Failed to update book");
        console.log("Book updated successfully");
        // Refresh booksData after update
        booksData = await fetchData({});
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
};