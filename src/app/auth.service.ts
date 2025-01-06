import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private baseUrl = 'http://localhost:8080/api/admin';

  login(credentials: { name: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap(() => {
          // Just save a simple token
          localStorage.setItem('token', 'logged_in');
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') === 'logged_in';
  }
}