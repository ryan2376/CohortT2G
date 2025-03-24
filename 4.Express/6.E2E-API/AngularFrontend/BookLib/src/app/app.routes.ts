// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', component: BookListComponent }, // Book list page
  { path: 'register', component: RegisterComponent } // Register page
];