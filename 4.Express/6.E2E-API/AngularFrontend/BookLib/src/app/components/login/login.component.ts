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

        // Normalize role_name to lowercase for comparison
        const roleName = response.user.role_name.toLowerCase();

        // Redirect to the appropriate dashboard based on role
        if (roleName === 'admin') {
          this.router.navigate(['/admin']).then(() => {
            console.log('Navigated to admin dashboard');
          });
        } else if (roleName === 'librarian') {
          this.router.navigate(['/librarian']).then(() => {
            console.log('Navigated to librarian dashboard');
          });
        } else if (roleName === 'borrower') {
          this.router.navigate(['/borrower']).then(() => {
            console.log('Navigated to borrower dashboard');
          });
        } else {
          alert('You are not authorized to access this page. Please contact an admin.');
          this.router.navigate(['']).then(() => {
            console.log('Navigated to book list');
          });
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your email and password.');
      }
    });
  }
}