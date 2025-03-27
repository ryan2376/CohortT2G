// src/app/components/dashboards/librarian-dash/librarian-dash.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngFor and *ngIf
import { AuthService } from '../../../services/auth.service';
import { BookService } from '../../../services/book.service';
import { Router } from '@angular/router';
import { Borrow } from '../../../models/borrow'; // Import the Borrow model

@Component({
  selector: 'app-librarian-dash',
  standalone: true,
  imports: [CommonModule], // Add CommonModule for structural directives
  templateUrl: './librarian-dash.component.html',
  styleUrls: ['./librarian-dash.component.css']
})
export class LibrarianDashComponent implements OnInit {
  activeBorrows: Borrow[] = []; // Use the Borrow type

  constructor(
    private authService: AuthService,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || currentUser.role_name !== 'Librarian') {
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
}