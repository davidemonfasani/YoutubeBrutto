import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from '../interfaces/video';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http : HttpClient) { }


  fetchVideos(): Observable<Video[]> {
    return this.http.get<Video[]>('https://127.0.0.1:8000/api/fetchVideos');
  }
}
