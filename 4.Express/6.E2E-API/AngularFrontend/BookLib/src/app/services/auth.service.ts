// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponse, User } from '../models/user'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/v1/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null); // Store the current user
  public currentUser$ = this.currentUserSubject.asObservable(); // Observable for components to subscribe to

  constructor(private http: HttpClient) {}

  register(user: { name: string; email: string; password: string; role_id: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, { withCredentials: true });
  }

  login(user: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, user, { withCredentials: true }).pipe(
      tap(response => {
        // Store the user data after a successful login
        this.currentUserSubject.next(response.user);
      })
    );
  }
  create(book: { title: string; author: string; year: number; genre: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, book, { withCredentials: true });
  }
  update(book: { id: number; title: string; author: string; year: number; genre: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, book, { withCredentials: true });
  }

  

  // Method to get the current user
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Method to clear the user on logout (we’ll use this later)
  logout() {
    this.currentUserSubject.next(null);
  }
}