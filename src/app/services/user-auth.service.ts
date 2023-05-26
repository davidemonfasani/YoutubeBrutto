import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subject, catchError, map, of, tap, throwError } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Utente } from '../interfaces/utente';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  errorMessage$ = new Subject<string>();
  private readonly TOKEN_KEY = 'token';
  CurrentUrl ='';
  isLogged = false;

  utente : Utente = {
    nome : '',
    cognome : '',
    username : '',
    linkpic: '',
    email: '',
    password: '',
  }

  constructor(private http : HttpClient, private router: Router) {
    }




  async register(body : any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    const option = {headers: headers};


    return this.http
    .post<any>(
      'http://127.0.0.1:8000/api/utentes/signIn',
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
        this.isLogged = true;
          localStorage.setItem('utente', JSON.stringify(Response.dati))
      },
    });
  }

  async login(body: any) {
    return this.http
      .post<any>( // Change the response type to 'any' to capture the entire response
        'http://127.0.0.1:8000/api/utentes/login',
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
        next: (response) => { // Use a generic 'response' parameter to capture the entire response
          console.log('Response:', response);
          localStorage.setItem('token', response.token);
          console.log('Token:', this.getToken());
          console.log('Is token valid:', this.isValidToken(this.getToken()));
          this.router.navigateByUrl('/homepage');
          this.isLogged = true;
          localStorage.setItem('utente', JSON.stringify(response.dati))
          // this.utente = response.dati;
          // console.log("questo è l'utente", this.utente)
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

  verifyToken(token: any): Observable<boolean> {
    if (!token) {
      this.router.navigateByUrl('/login');
      return of(false);
    } else {
      return of(true);
    }
  }



  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('utente')
    this.router.navigateByUrl('/login')
  }

}




