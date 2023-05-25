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
    video_titolo: '',
    testo: '',
  }

  constructor(
    private route: ActivatedRoute,
    private http : HttpClient
    ) { }


  fetchComments(titolo : string): Observable<Commento[]> {
    return this.route.queryParams.pipe(
      switchMap(params => {
      const titolo = params['videotitolo'];
      if (titolo) {
       return this.http.get<Commento[]>(`http://127.0.0.1:8000/api/commentis/${titolo}`);
      } else {
      throw new Error('videotitolo parameter is missing from the URL');
      }
      })
      );

  }

  async registerComment(body : any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    const option = {headers: headers};


    return this.http
    .post<{ token: string }>(
      'http://127.0.0.1:8000/api/commentis',
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
      },
    });
  }

}
