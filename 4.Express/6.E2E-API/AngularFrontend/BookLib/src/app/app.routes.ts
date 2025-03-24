// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BookDetailComponent } from './components/book-details/book-details.component';

export const routes: Routes = [
  { path: '', component: BookListComponent }, // Book list page
  { path: 'register', component: RegisterComponent }, // Register page
  { path: 'login', component: LoginComponent }, // Login page
  { path: 'book/:id', component: BookDetailComponent } // Book detail page
];