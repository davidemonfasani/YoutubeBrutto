import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from '../interfaces/video';
import { Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class VideoService {

  video = {
    id:0,
    titolo: '',
    descrizione: '',
    utente_username: '',
    linkvideo: ''
  }

  likeBody = {

  }



  constructor(private http : HttpClient,
    private router: Router,
    private sanitizer : DomSanitizer,
    private route: ActivatedRoute
  )
  { }




  fetchVideos(): Observable<Video[]> {
    return this.http.get<Video[]>('http://127.0.0.1:8000/api/videos');
  }

  goVideo(body : any) {
    this.video = body;
    console.log('sei nel video ', this.video.id);
      this.router.navigateByUrl(`/video?video_id=${this.video.id}`);
   }

   getVideo(): Observable<Video> {
    return this.route.queryParams.pipe(
    switchMap(params => {
    const video_id = params['video_id'];
    if (video_id) {
    return this.http.get<Video>(`http://127.0.0.1:8000/api/videos/${video_id}`);
    } else {
    throw new Error('video_id parameter is missing from the URL');
    }
    })
    );
   }


   filterVideo(ricerca: string): Observable<Video[]> {
    const params = new HttpParams().set('titleOrTag', ricerca);
    return this.http.get<Video[]>('http://127.0.0.1:8000/api/videos/filterVideo', { params })
      .pipe(
        catchError((error: any) => {
          if (error.status === 401) {
            return throwError('Unauthorized');
          } else if (error.status === 403) {
            return throwError('Video non trovato');
          } else {
            return throwError('An error occurred');
          }
        })
      );
  }

  makeLikeBody(idUtente : number, idVideo : number) {
    return this.likeBody = {
      utente_id : idUtente,
      video_id : idVideo,
    }
  }


  async addLike(idUtente : number, idVideo : number) {
    const body = this.makeLikeBody(idUtente, idVideo)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    console.log('questo è il body di addLike', body)
    return this.http.post<any>('http://127.0.0.1:8000/api/videos/addLike', body, options)
    .pipe(
      tap({
        error: (error) => {
          var check = error.status;
          let errorMessage = error.error.error;
          console.log(errorMessage);
        },
      })
    )
    .subscribe({
      next: (Response) => {
        console.log('Response:', Response);
      },
    });
  }


  async removeLike(idUtente : number, idVideo : number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };

    const body = this.makeLikeBody(idUtente, idVideo)
    return this.http.post<any>('http://127.0.0.1:8000/api/videos/removeLike', body, options)
    .pipe(
      tap({
        error: (error) => {
          var check = error.status;
          let errorMessage = error.error.error;
          console.log(errorMessage);
        },
      })
    )
    .subscribe({
      next: (Response) => {
        console.log('Response:', Response);
      },
    });
  }



  fetchLikes(id: number): Observable<number> {
    return this.route.queryParams.pipe(
      switchMap(params => {
      const id= params['videoid'];
      if (id) {
       return this.http.get<number>(`http://127.0.0.1:8000/api/commentis/${id}`);
      } else {
      throw new Error('videoidparameter is missing from the URL');
      }
      })
      );
    }



      fetchViews(id: number): Observable<number> {
        return this.route.queryParams.pipe(
          switchMap(params => {
          const id= params['videoid'];
          if (id) {
           return this.http.get<number>(`http://127.0.0.1:8000/api/commentis/${id}/`);
          } else {
          throw new Error('videoidparameter is missing from the URL');
          }
          })
          );
        }





  sanitizeVideoUrl(videoUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }
}
