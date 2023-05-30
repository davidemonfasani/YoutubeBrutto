import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, pipe, switchMap, tap, throwError } from 'rxjs';
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
  likeBody = {

  }
  constructor(
    private route: ActivatedRoute,
    private http : HttpClient
    ) { }


  fetchComments(id: number): Observable<Commento[]> {
    return this.route.queryParams.pipe(
      switchMap(params => {
      const id= params['video_id'];
      if (id) {
       return this.http.get<Commento[]>(`http://127.0.0.1:8000/api/commentis/${id}`);
      } else {
      throw new Error('video_idparameter is missing from the URL');
      }
      })
      );

  }

  registerComment(body: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    console.log(body);
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
  async addLike(utente_Id : number, commenti_Id : number) {
    console.log('utente che mette like ', utente_Id)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    return this.http.post<any>(`http://127.0.0.1:8000/api/commentis/${commenti_Id}/addLike`, { utente_id: utente_Id }, options)
    .pipe(
      tap({
        error: (error) => {
          var check = error.status;
          let errorMessage = error.error.error;
          this.errorMessage$.next(errorMessage);
        },
      })
    )
  }


  async removeLike(utente_Id : number, commenti_Id : number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    return this.http.post<any>(`http://127.0.0.1:8000/api/commentis/${commenti_Id}/removeLike`, { utente_id: utente_Id }, options)
    .pipe(
      tap({
        error: (error) => {
          var check = error.status;
          let errorMessage = error.error.error;
          this.errorMessage$.next(errorMessage);
        },
      })
    )
  }
  fetchLikes(utente_id: number, commento_id: number): Observable<{ UtenteLiked: boolean; likes: number }> {
    console.log('id utente', utente_id);
    if (commento_id) {
    return this.http.get<{ UtenteLiked: boolean; likes: number }>(`http://127.0.0.1:8000/api/commentis/fetchlikes/${commento_id}?utente_id=${utente_id}`);
    } else {
    throw new Error('Commento_id parameter is missing from the URL');
    }
   }

  makeLikeBody(idUtente : number, idCommento : number) {
    return this.likeBody = {
      utente_id : idUtente,
      Commento_id : idCommento,
    }
  }


}
