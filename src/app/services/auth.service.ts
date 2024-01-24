import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, catchError, map, of, timer } from 'rxjs';

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

  constructor(private apiService: ApiService) {
  }

  login(login: string | null | undefined, password: string | null | undefined): Observable<boolean> {
    return this.apiService.post('auth/login', { login, password }).pipe(
      map((token) => {
        if (token) {
          localStorage.setItem('token', token);
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  get isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  get Token() {
    return localStorage.getItem('token');
  }
}
