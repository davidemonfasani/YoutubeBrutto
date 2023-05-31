import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from '../interfaces/video';
import { Observable, Subject, catchError, of, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class VideoService {
  idA : number
  video = {
    id:0,
    titolo: '',
    descrizione: '',
    utente_username: '',
    linkvideo: ''
  }
  errorMessage$ = new Subject<string>();
  likeBody = {

  }



  constructor(private http : HttpClient,
    private router: Router,
    private sanitizer : DomSanitizer,
    private route: ActivatedRoute
  )
  {
    this.idA = 0
  }




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
    this.idA = video_id

    if (video_id) {
    return this.http.get<Video>(`http://127.0.0.1:8000/api/videos/${video_id}`);
    } else {
    throw new Error('video_id parameter is missing from the URL');
    }
    })
    );
   }


   filterVideo(): Observable<Video[]> {

    return this.route.queryParams.pipe(
    switchMap(params => {
    const Search = params['cerca'];
    console.log(Search)
    if (Search) {
      console.log('chiamata partita')
      return this.http.get<Video[]>(`http://127.0.0.1:8000/api/videos/search?searchTerm=${Search}`);
    } else {
      console.log('chiamata non partita')
      throw new Error('Search parameter is missing from the URL');
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
          this.errorMessage$.next(errorMessage);
        },
      })
    )
  }


  async removeLike(idUtente : number, idVideo : number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };

    const body = this.makeLikeBody(idUtente, idVideo)
    return this.http.post<any>('http://127.0.0.1:8000/api/videos/removeLike', body, options)
    .pipe(
      tap({
        error: (error) => {
          let errorMessage = error.error.error;
          console.log(errorMessage);
          this.errorMessage$.next(errorMessage);
        },
      })
    )
  }



  fetchLikes(utente_id: number): Observable<{ UtenteLiked: boolean; likes: number }> {
    console.log('id utente', utente_id);
    return this.route.queryParams.pipe(
      switchMap(params => {
        const id = params['video_id'];
        if (id) {
          return this.http.get<{ UtenteLiked: boolean; likes: number }>(`http://127.0.0.1:8000/api/videos/fetchlikes/${id}?utente_id=${utente_id}`);
        } else {
          throw new Error('video_idparameter is missing from the URL');
        }
      })
    );
  }


  fetchViews(id1: number): Observable<any> {
        return this.route.queryParams.pipe(
          switchMap(params => {
          const id= params['video_id'];
          if (id) {
           return this.http.get<number>(`http://127.0.0.1:8000/api/videos/fetchViews/${id}`);
          } else {
          throw new Error('video_idparameter is missing from the URL');
          }
          })
          );
        }





  sanitizeVideoUrl(videoUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }


async addView(body : any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    console.log('questo è il body view:', body)
    return this.http.post<any>('http://127.0.0.1:8000/api/videos/addView', body, options)
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
async Upload(body : any) {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const options = { headers: headers };
  console.log('questo è il body view:', body)
  return this.http.post<any>('http://127.0.0.1:8000/api/videos/store', body, options)
  .pipe(
    tap({
      error: (error) => {
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
