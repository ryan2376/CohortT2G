// src/app/components/book-list/book-list.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  books: Book[] = [];

  currentUser: User | null = null; // Store the current user

  constructor(private authService: AuthService,
    private bookService: BookService)// Inject BookService
  {
    this.currentUser = this.authService.getCurrentUser(); // Get the current user on initialization
  }

  ngOnInit(): void {
    this.loadBooks(); // Fetch books on initialization
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        console.log('Books loaded:', books);
      },
      error: (error) => {
        console.error('Error loading books:', error);
        alert('Failed to load books. Please try again later.');
      }
    });
  }

  onRegisterLinkClick() {
    console.log('Register link clicked!');
  }

  logout() {
    this.authService.logout();
    this.currentUser = null; // Clear the current user
    console.log('User logged out');
  }
}