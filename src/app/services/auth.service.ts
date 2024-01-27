import { EventEmitter, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) { }

  changeAuthenticationStatus = new EventEmitter();

  login(login: string | null | undefined, password: string | null | undefined): Observable<boolean> {
    return this.apiService.post('auth/login', { login, password }).pipe(
      map((token) => {
        if (token) {
          localStorage.setItem('token', token);
          this.changeAuthenticationStatus.emit();
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
    this.changeAuthenticationStatus.emit();
  }

  get token() {
    return localStorage.getItem('token');
  }
}
