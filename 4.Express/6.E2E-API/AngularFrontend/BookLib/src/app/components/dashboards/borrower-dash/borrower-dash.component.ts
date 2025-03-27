// src/app/components/dashboards/borrower-dash/borrower-dash.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngFor and *ngIf
import { AuthService } from '../../../services/auth.service';
import { BookService } from '../../../services/book.service';
import { Router } from '@angular/router';
import { Borrow } from '../../../models/borrow'; // Import the Borrow model

@Component({
  selector: 'app-borrower-dash',
  standalone: true,
  imports: [CommonModule], // Add CommonModule for structural directives
  templateUrl: './borrower-dash.component.html',
  styleUrls: ['./borrower-dash.component.css']
})
export class BorrowerDashComponent implements OnInit {
  borrowedBooks: Borrow[] = []; // Use the Borrow type
  currentUser: any = null;

  constructor(
    private authService: AuthService,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser || this.currentUser.role_name !== 'Borrower') {
      alert('You are not authorized to access this page.');
      this.router.navigate(['']);
      return;
    }

    this.loadBorrowedBooks();
  }

  loadBorrowedBooks(): void {
    this.bookService.getBorrowedBooks(this.currentUser.id).subscribe({
      next: (books) => {
        this.borrowedBooks = books;
        console.log('Borrowed books loaded:', books);
      },
      error: (error) => {
        console.error('Error loading borrowed books:', error);
        alert('Failed to load borrowed books. Please try again later.');
      }
    });
  }
}