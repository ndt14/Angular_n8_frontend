import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8088/api/auth/signup';
  private apiSignin = 'http://localhost:8088/api/auth/signin';
  private storageKey = 'isLoggedIn';

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    const registerUrl = `${this.apiUrl}`;
    return this.http.post(registerUrl, userData);
  }

  login(credentials: any): Observable<any> {
    const loginUrl = `${this.apiSignin}`;
    return this.http.post(loginUrl, credentials);
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem(this.storageKey) === 'true';
  }

  setLoggedIn(value: boolean): void {
    localStorage.setItem(this.storageKey, value.toString());
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }
}
