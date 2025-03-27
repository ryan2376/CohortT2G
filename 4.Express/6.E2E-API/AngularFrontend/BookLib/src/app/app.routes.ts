// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BookDetailComponent } from './components/book-details/book-details.component';
import { AdminDashComponent } from './components/dashboards/admin-dash/admin-dash.component';
import { LibrarianDashComponent } from './components/dashboards/librarian-dash/librarian-dash.component';
import { BorrowerDashComponent } from './components/dashboards/borrower-dash/borrower-dash.component';

export const routes: Routes = [
  { path: '', component: BookListComponent }, // Book list page
  { path: 'register', component: RegisterComponent }, // Register page
  { path: 'login', component: LoginComponent }, // Login page
  { path: 'book/:id', component: BookDetailComponent }, // Book detail page
  { path: 'admin', component: AdminDashComponent }, // Admin dash page
  { path: 'librarian', component: LibrarianDashComponent }, // Librarian dash page
  { path: 'borrower', component: BorrowerDashComponent } // Borrower dash page
];