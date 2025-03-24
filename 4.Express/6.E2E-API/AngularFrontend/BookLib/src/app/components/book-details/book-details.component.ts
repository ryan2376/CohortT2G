// src/app/components/book-detail/book-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';


@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book | undefined;

  // Temporary static list (we’ll replace this with a service later)
  private books: Book[] = [];

  constructor(private route: ActivatedRoute,
    private bookService: BookService // Inject BookService
  ) {}

  ngOnInit(): void {
    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBook(bookId);  
  }

  loadBook(id: number): void {
    this.bookService.getBookById(id).subscribe({
      next: (book) => {
        this.book = book;
        console.log('Book loaded:', book);
      },
      error: (error) => {
        console.error('Error loading book:', error);
        this.book = undefined; // Ensure book is undefined if there's an error
        alert('Failed to load book details. Please try again later.');
      }
    });
  }
}