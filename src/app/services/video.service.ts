import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from '../interfaces/video';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http : HttpClient, private router: Router, private sanitizer : DomSanitizer) { }
  video = {
    titolo: '',
    descrizione: '',
    utente_username: '',
    linkvideo: ''
  }

  fetchVideos(): Observable<Video[]> {
    return this.http.get<Video[]>('http://127.0.0.1:8000/api/videos');
  }

  goVideo(body : any) {
    this.video = body
    console.log('sei nel video ', this.video.titolo)
    this.router.navigateByUrl('/video')



  }

  sanitizeVideoUrl(videoUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }
}
