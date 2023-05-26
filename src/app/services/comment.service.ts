import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, switchMap, tap, throwError } from 'rxjs';
import { Commento } from '../interfaces/commento';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  errorMessage$ = new Subject<string>();
  commento = {
    utente_username: '',
    video_id: 0,
    testo: '',
  }

  constructor(
    private route: ActivatedRoute,
    private http : HttpClient
    ) { }


  fetchComments(id: number): Observable<Commento[]> {
    return this.route.queryParams.pipe(
      switchMap(params => {
      const id= params['videoid'];
      if (id) {
       return this.http.get<Commento[]>(`http://127.0.0.1:8000/api/commentis/${id}`);
      } else {
      throw new Error('videoidparameter is missing from the URL');
      }
      })
      );

  }

  registerComment(body: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };

    return this.http.post<any>('http://127.0.0.1:8000/api/commentis/store', body, options)
      .pipe(
        catchError(error => {
          const errorMessage = error.error.error;
          console.log(errorMessage);
          this.errorMessage$.next(errorMessage);
          return throwError(errorMessage);
        })
      );
  }



}
