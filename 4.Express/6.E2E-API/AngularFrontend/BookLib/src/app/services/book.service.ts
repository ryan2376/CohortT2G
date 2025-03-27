// src/app/services/book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { BorrowerDashComponent } from '../components/dashboards/borrower-dash/borrower-dash.component';
import { Borrow } from '../models/borrow';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000/api/v1/books'; // Adjust this URL to match your backend
  private borrowUrl = 'http://localhost:3000/api/v1/borrow'; // Adjust this URL to match your backend

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  borrowBook(bookId: number, userId: number): Observable<any> {
    const borrowData = { book_id: bookId, user_id: userId };
    return this.http.post(this.borrowUrl, borrowData, { withCredentials: true });
  }
  getBorrowedBooks(userId: number): Observable<Borrow[]> {
    return this.http.get<Borrow[]>(`${this.borrowUrl}/user/${userId}`, { withCredentials: true });
  }

  getAllActiveBorrows(): Observable<Borrow[]> {
    return this.http.get<Borrow[]>(`${this.borrowUrl}/active`, { withCredentials: true });
  }
}