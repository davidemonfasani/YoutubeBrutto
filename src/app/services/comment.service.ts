import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http : HttpClient) { }


  fetchComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>('http://127.0.0.1:8000/api/commenti');
  }
}
