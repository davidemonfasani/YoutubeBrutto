import { Component } from '@angular/core';
import { Playlist } from 'src/app/interfaces/playlist';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-playlistpage',
  templateUrl: './playlistpage.component.html',
  styleUrls: ['./playlistpage.component.css']
})
export class PlaylistpageComponent {
body : any;
  videos : any
  playlist : Playlist;
  constructor(
    private playService : PlaylistService
  ) {

    this.playlist = {
      id: 0,
      name: '',
      visibility: '',
      utente_id : 0,
      aggiunto : false
    }

    }





  ngOnInit() {
    console.log("OKSADJDADKJA")
    this.playlistLoad()
  }

  playlistLoad() {
    this.playService.getPlaylist().subscribe(response => {
      this.playlist = response;
      this.videos = response.videos;
      console.log('risposta', response)
    });
  }
}
