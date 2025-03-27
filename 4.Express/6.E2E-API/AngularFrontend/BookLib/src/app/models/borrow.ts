// src/app/models/borrow.ts
export interface Borrow {
    borrow_id: number;
    user_id: number;
    book_id: number;
    copy_id: number;
    librarian_id: number | null;
    borrow_date: string;
    return_date: string;
    status: string;
    book_title: string;
    book_author: string;
    book_image: string;
    user_name?: string;
}