// src/fetch.ts

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