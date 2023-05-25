import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subject, catchError, map, of, tap, throwError } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http : HttpClient, private router: Router) {
    }

  errorMessage$ = new Subject<string>();
  private readonly TOKEN_KEY = 'token';
  CurrentUrl ='';
  isLogged = false;



  async register(body : any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    const option = {headers: headers};


    return this.http
    .post<{ token: string }>(
      'http://127.0.0.1:8000/api/signIn',
      body,
      option
    )
    .pipe(
      tap({
        error: (error) => {
          var check = error.status;
          let errorMessage = error.error.error;
          console.log(errorMessage);
          this.errorMessage$.next(errorMessage);
        },
      })
    )
    .subscribe({
      next: (Response) => {
        console.log('Response:', Response);
        localStorage.setItem('token', Response.token);
        console.log('Token:', this.getToken());
        console.log('Is token valid:', this.isValidToken(this.getToken()));
        this.router.navigateByUrl('/homepage');
      },
    });
  }

  async login(body: any) {

    return this.http
    .post<{ token: string }>(
      'http://127.0.0.1:8000/api/login',
      body,
    )
    .pipe(
      tap({
        error: (error) => {
          var check = error.status;
          let errorMessage = error.error.error;
          console.log(errorMessage);
          this.errorMessage$.next(errorMessage);
        },
      })
    )
    .subscribe({
      next: (Response) => {
        console.log('Response:', Response);
        localStorage.setItem('token', Response.token);
        console.log('Token:', this.getToken());
        console.log('Is token valid:', this.isValidToken(this.getToken()));
        this.router.navigateByUrl('/homepage');
        this.isLogged = true;
      },
    });
  }
  isValidToken(token: string | null): boolean {
    try {
      if (token === null) {
        return false;
      }
      console.log('Token:', token);
      const decoded: any = jwt_decode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      console.log('Decoded token:', decoded);
      if (decoded.exp < currentTime) {
        console.log('Token is expired');
        return false;
      }
      // Add any additional validation checks here
      return true;
    } catch (err) {
      console.log('Token is invalid:', (err as Error).message);
      return false;
    }
  }
  storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
