import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, catchError, map, of, timer } from 'rxjs';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';

interface DecodedToken {
  userId: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService, private router: Router, private dialog: MatDialog) {
    const token = this.getToken();
  }

  login(login: string | null | undefined, password: string | null | undefined): Observable<boolean> {
    return this.apiService.post('auth/login', { login, password }).pipe(
      map((result) => {
        if (result.authenticated) {
          localStorage.setItem('token', result.token);
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
