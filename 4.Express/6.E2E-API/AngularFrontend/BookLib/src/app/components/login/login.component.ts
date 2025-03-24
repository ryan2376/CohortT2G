// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log('Login form submitted:', this.user);
    this.authService.login(this.user).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['']).then(() => {
          console.log('Navigated to book list');
        });
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your email and password.');
      }
    });
  }
}