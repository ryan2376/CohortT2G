// borrowTypes.ts
export interface BorrowResponse {
    borrow_id: number;
    user_id: number;
    book_id: number;
    copy_id: number;
    librarian_id: number | null;
    borrow_date: string;
    return_date: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface BorrowRequestBody {
    book_id: number;
    user_id: number;
}