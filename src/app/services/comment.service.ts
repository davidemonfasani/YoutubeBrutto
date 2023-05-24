import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commento } from '../interfaces/commento';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  commento = {
    utente_username: '',
    video_titolo: '',
    testo: '',
  }

  constructor(private http : HttpClient) { }


  fetchComments(titolo : string): Observable<Commento[]> {
    return this.http.get<Commento[]>('http://127.0.0.1:8000/api/commentos', {params: {titolo}});
  }
}
