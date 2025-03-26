// src/app/components/book-detail/book-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service'; // Import AuthService
import { User } from '../../models/user';


@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book | undefined;
  currentUser: User | null = null; // Store the current user

  // Temporary static list (we’ll replace this with a service later)
  // private books: Book[] = [];

  constructor(private route: ActivatedRoute,
              private bookService: BookService,// Inject BookService
              private authService: AuthService, // Inject AuthService
              private router: Router // Inject Router
  ) {
    this.currentUser = this.authService.getCurrentUser(); // Get the current user
  }
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

  borrowBook(): void {
    if (!this.currentUser) {
      alert('Please log in to borrow a book.');
      this.router.navigate(['/login']);
      return;
    }

    if (!this.book) {
      alert('Book not found.');
      return;
    }

    // Convert user_id to a number since currentUser.id is a string
    // const userId = parseInt(this.currentUser.id, 10);
    // if (isNaN(userId)) {
    //   alert('Invalid user ID.');
    //   return;
    // }

    this.bookService.borrowBook(this.book.id, this.currentUser.id).subscribe({
      next: (response) => {
        console.log('Borrow successful:', response);
        alert('Book borrowed successfully!');
        this.router.navigate(['']); // Redirect to book list
      },
      error: (error) => {
        console.error('Error borrowing book:', error);
        alert('Failed to borrow book. ' + (error.error?.message || 'Please try again later.'));
      }
    });
  }
}