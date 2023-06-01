import { Component, Input } from '@angular/core';
import { Playlist } from 'src/app/interfaces/playlist';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent {
    @Input() playlist!: Playlist
    constructor(private playService : PlaylistService) {}


  goPlaylist() {
    this.playService.goPlaylist(this.playlist)
  }
}
