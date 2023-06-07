import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subject, catchError, map, of, switchMap, tap, throwError } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Utente } from '../interfaces/utente';
import { Video } from '../interfaces/video';
import { LoginComponent } from '../pages/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../pages/register/register.component';
import { DialogRef } from '@angular/cdk/dialog';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  errorMessage$ = new Subject<string>();
  private readonly TOKEN_KEY = 'token';
  CurrentUrl ='';
  isLogged = false;

  utente : Utente = {
    id : 0,
    nome : '',
    cognome : '',
    username : '',
    linkppic: '',
    email: '',
    password: '',
  }

  constructor(private http : HttpClient, private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private dialogS : DialogService

    ) {
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
        this.isLogged = true;
        this.dialog.closeAll();
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
          this.isLogged = true;
          this.dialog.closeAll();
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

  verifyToken(token: string | null): boolean {
    try {
      if (token === null) {
        return false;
      }
      else
      {
        const decoded: any = jwt_decode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
          console.log('Token is expired');
          return false;
        }
        else{
          return true;
        }
      }
    } catch (err) {
      console.log('Token is invalid:', (err as Error).message);
      return false;
    }
  }


  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('utente');
    this.router.navigate(['/homepage']).then(() => {
      window.location.reload();
    });
  }





  fetchSubs(): Observable<Utente[]> {
    const utenteString = localStorage.getItem('utente');
    if (utenteString) {
      const utente = JSON.parse(utenteString);
      const id = utente.id;
      return this.http.get<Utente[]>(`http://127.0.0.1:8000/api/utentes/fetchSubs/${id}`);
    } else {
      throw new Error('Utente is missing from local storage');
    }
  }


  getHistory(): Observable<Video[]> {
    const utenteString = localStorage.getItem('utente');
    if (utenteString) {
      const utente = JSON.parse(utenteString);
      const id = utente.id;
      return this.http.get<Video[]>(`http://127.0.0.1:8000/api/videos/sorted/cronologia/${id}`);
    } else {
      throw new Error('Utente is missing from local storage');
    }

  }



  subscribe(body: any): Promise<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    console.log(body);
    return this.http
      .post<any>('http://127.0.0.1:8000/api/utentes/subscribe', body, options)
      .pipe(
        catchError(error => {
          const errorMessage = error.error.error;
          console.log(errorMessage);
          this.errorMessage$.next(errorMessage);
          return throwError(errorMessage);
        })
      )
      .toPromise();
  }

  unsubscribe(body: any): Promise<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    console.log(body);
    return this.http
      .post<any>('http://127.0.0.1:8000/api/utentes/unsubscribe', body, options)
      .pipe(
        catchError(error => {
          const errorMessage = error.error.error;
          console.log(errorMessage);
          this.errorMessage$.next(errorMessage);
          return throwError(errorMessage);
        })
      )
      .toPromise();
  }

  checksub(body: any): Observable<boolean> {
    return this.http.get<boolean>('http://127.0.0.1:8000/api/utentes/checksub', { params: body });
  }


  getUtenteId() {
    const utenteString = localStorage.getItem('utente')
    if(utenteString) {
      const user = JSON.parse(utenteString)
      return user.id
    }
  }








}




