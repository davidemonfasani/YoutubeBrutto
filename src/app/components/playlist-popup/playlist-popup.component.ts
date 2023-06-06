import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Playlist } from 'src/app/interfaces/playlist';
import { PlaylistService } from 'src/app/services/playlist.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-playlist-popup',
  templateUrl: './playlist-popup.component.html',
  styleUrls: ['./playlist-popup.component.css']
})
export class PlaylistPopupComponent {
  errorMessage = ''
  playlists : Playlist[] = [];
  verifica = false;
  formGroup: FormGroup;
  items: string[] = ['Public', 'Private'];

  constructor(private playService : PlaylistService,
    private formBuilder : FormBuilder,
    private auth : UserAuthService,
    private videoService : VideoService,
    private cdRef: ChangeDetectorRef,
    )
    {
      this.formGroup = this.formBuilder.group({
        playlistName: '', // Add the 'playlistName' control
        selectedItem: [''] // Initial value of the combobox
      });


  }

  ngOnInit() {


    this.fetchPlaylist()
  }

  fetchPlaylist() {
    this.playService.fetchPlaylists().subscribe((result : Playlist[])=> {
      this.playlists = result;
      console.log(this.playlists)
      if (this.playlists.length != 0)
      {
        this.verifica = true
        this.checkVideoInPlaylists();
      }
    }

    )
  }

  confirmDelete(playlist: any): void {
  const confirmation = confirm("Sei sicuro di volere eliminare questa playlist?");
  if (confirmation) {
    this.deletePlaylist(playlist);
  }
}


  checkVideoInPlaylists() {
    const videoId = this.videoService.idA;
    this.playlists.forEach((playlist) => {
      this.playService.checkVideoInPlaylist(playlist.id, videoId, this.auth.getUtenteId()).subscribe(
        (response) => {
          // Handle the success response
          console.log('Response:', response); // Log the response object
          playlist.aggiunto = response.exists;
          console.log('aggiunto:', response.exists); // Log the aggiunto property
          this.cdRef.detectChanges(); // Set aggiunto property based on response
        },
        (error) => {
          // Handle the error response
          console.error('Error checking video in playlist:', error);
        }
      );
    });
  }

  deletePlaylist(playlist: Playlist) {

    this.playService.deletePlaylist(playlist.id).subscribe(
      (response) => {
        // Handle the success response
        console.log('Playlist removed:', response);
        this.fetchPlaylist()
      },
      (error) => {
        // Handle the error response
        console.error('Error removing playlist:', error);
      }
    );
  }



  addToPlaylist(playlist : Playlist) {
    const body = {
      video_id : this.videoService.idA,
      playlist_id: playlist.id
    }

    this.playService.addToPlaylist(body).subscribe(
      (response) => {
        // Handle the success response
        console.log('Playlist added:', response);
        playlist.aggiunto = true;
      },
      (error) => {
        // Handle the error response
        console.error('Error adding playlist:', error);
      }
    );

  }

  removeToPlaylist(playlist: Playlist) {
    const body = {
      video_id: this.videoService.idA,
      playlist_id: playlist.id
    };

    this.playService.removeVideo(body).subscribe(
      (response) => {
        // Handle the success response
        console.log('Video removed from playlist:', response);
        playlist.aggiunto = false; // Update the aggiunto property
      },
      (error) => {
        // Handle the error response
        console.error('Error removing video from playlist:', error);
      }
    );
  }



  newPlaylist() {

    const body = {
      utente_id : this.auth.getUtenteId(),
      name : this.formGroup.get('playlistName')?.value,
      visibility : this.formGroup.get('selectedItem')?.value
    }
    console.log(body)
    this.playService.newPlaylist(body).subscribe(
      (response) => {
        // Handle the success response
        console.log('Playlist added:', response);
        this.fetchPlaylist()
      },
      (error) => {
        // Handle the error response
        console.error('Error adding playlist:', error);
        this.errorMessage = 'ERRORE! Ricontrolla le informazioni..';
      }
    );
  }
}
