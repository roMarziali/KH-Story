import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = 'http://localhost:3000/api';


  constructor(private http: HttpClient) { }

  get(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get<any>(url);
  }

  post(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.post(url, data);
  }

}
