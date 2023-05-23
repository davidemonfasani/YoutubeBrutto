import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http : HttpClient) { }



  register(body : any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    const option = {headers: headers};

    this.http.post('127.0.0.1:8000/api/signIn', body, option).pipe(
      catchError(error => {
        return throwError('Username o Email già in uso!');
      })
    );
  }

  login(body1: any): Observable<boolean> {
    return this.http.post<string>('http://127.0.0.1:8000/api/login', body1, { observe: 'response' }).pipe(
      map((data: any) => {
        const check = data.status;
        if (check === 212) {

          //Controlla il check
          return true;
        } else {

          return false;
        }
      }),
      catchError((error: any) => {
        console.log(error)
        //Prendi errore
        return of(false); // Return false as an Observable
      })
    );
  }
}
