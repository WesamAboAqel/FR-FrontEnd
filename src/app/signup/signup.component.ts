import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { signal } from '@angular/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  private apiUrl = 'http://localhost:8080/api/admin';
  private http = inject(HttpClient);
  private router = inject(Router);

  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);

  signupForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  onSubmit() {
    if (this.signupForm.password !== this.signupForm.confirmPassword) {
      this.errorMessage.set('Passwords do not match!');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const signupData = {
      name: this.signupForm.name,
      email: this.signupForm.email,
      password: this.signupForm.password
    };

    this.http.post(`${this.apiUrl}/signup`, signupData).subscribe({
      next: (response: any) => {
        console.log('Signup successful', response);
        this.isLoading.set(false);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Signup failed', error);
        this.isLoading.set(false);
        this.errorMessage.set('Signup failed. Please try again.');
      }
    });
  }
}