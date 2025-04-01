// src/app/components/dashboards/librarian-dash/librarian-dash.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { BookService } from '../../../services/book.service';
import { Router } from '@angular/router';
import { Borrow } from '../../../models/borrow';

@Component({
  selector: 'app-librarian-dash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './librarian-dash.component.html',
  styleUrls: ['./librarian-dash.component.css']
})
export class LibrarianDashComponent implements OnInit {
  activeBorrows: Borrow[] = [];
  currentUser: any = null; // To store the logged-in librarian

  constructor(
    private authService: AuthService,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser || this.currentUser.role_name !== 'Librarian') {
      alert('You are not authorized to access this page.');
      this.router.navigate(['']);
      return;
    }

    this.loadActiveBorrows();
  }

  loadActiveBorrows(): void {
    this.bookService.getAllActiveBorrows().subscribe({
      next: (borrows) => {
        this.activeBorrows = borrows;
        console.log('Active borrows loaded:', borrows);
      },
      error: (error) => {
        console.error('Error loading active borrows:', error);
        alert('Failed to load active borrows. Please try again later.');
      }
    });
  }

  markAsReturned(borrowId: number): void {
    this.bookService.markAsReturned(borrowId, this.currentUser.id).subscribe({
      next: () => {
        alert('Book marked as returned successfully');
        this.loadActiveBorrows(); // Refresh the list
      },
      error: (error) => {
        console.error('Error marking book as returned:', error);
        alert('Failed to mark book as returned. Please try again later.');
      }
    });
  }
}