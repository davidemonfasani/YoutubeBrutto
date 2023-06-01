import { Injectable } from '@angular/core';
import { PlaylistPopupComponent } from '../components/playlist-popup/playlist-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { UserAuthService } from './user-auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Playlist } from '../interfaces/playlist';
import { Observable, Subject, catchError, pipe, switchMap, tap, throwError } from 'rxjs';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  playlist : Playlist = {
    id: 0,
    name: '',
    visibility: '',
    utente_id : 0,
    aggiunto : false
  }
  constructor(private dialog : MatDialog, private auth : UserAuthService, private http: HttpClient
    , private router : Router
    , private route: ActivatedRoute
    ) {
    const a = 0
  }

  managePlaylist() {
        const dialogRef = this.dialog.open(PlaylistPopupComponent, {
      width: '400px', // Adjust the width as per your requirement
      // Add any other necessary configuration options for the pop-up
    });

    // Optionally, handle the dialog result or any other actions after the pop-up is closed
    dialogRef.afterClosed().subscribe(result => {
      // Handle the result or perform any other actions
    });
  }


  fetchPlaylists(): Observable<Playlist[]> {
    const id = this.auth.getUtenteId();

    return this.http.get<Playlist[]>(`http://127.0.0.1:8000/api/playlist/fetch/${id}`);
  }

  newPlaylist(body : any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any additional headers as needed
    });

    return this.http.post(`http://127.0.0.1:8000/api/playlist/add`, body, { headers });
  }

  addToPlaylist(body:any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any additional headers as needed
    });

    return this.http.post(`http://127.0.0.1:8000/api/playlist/insertvideo`, body, { headers });

  }

  checkVideoInPlaylist(playlist_id: number, videoId: number, utenteId: number): Observable<{ exists: boolean }> {
    const url = `http://127.0.0.1:8000/api/playlist/check?playlist_id=${playlist_id}&video_id=${videoId}`;
    return this.http.get<{ exists: boolean }>(url);
  }

  removeVideo(body:any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any additional headers as needed
    });

    return this.http.post(`http://127.0.0.1:8000/api/playlist/removevideo`, body, { headers });

  }


  deletePlaylist(id:number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any additional headers as needed
    });
    const body = { id };

    return this.http.post(`http://127.0.0.1:8000/api/playlist/delete`, body, { headers });
  }


  goPlaylist(body : any) {
    this.playlist = body;
    this.router.navigateByUrl(`/playlist?playlist_id=${this.playlist.id}`)
  }

  getPlaylist(): Observable<any> {
    return this.route.queryParams.pipe(
      switchMap(params => {
        const playlist_id = params['playlist_id'];
        console.log('questo è il playlist_id', playlist_id)
        if (!playlist_id) {
          throw new Error('playlist_id parameter is missing from the URL');
        }

        return this.http.get<any>(`http://127.0.0.1:8000/api/playlist/${playlist_id}`);
      }),
      map(response => {
        return response.playlist;
      })
    );
  }




}
