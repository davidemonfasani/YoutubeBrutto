import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from 'src/app/interfaces/video';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
constructor(private router : Router, private videoService: VideoService) {}

videos: Video[] = [];

ngOnInit() {
  this.fetchVideos();
}

fetchVideos() {
  const utenteid = this.getUtenteId();
  if(utenteid) {
    this.videoService.sortVideos(utenteid)
    .subscribe((result: Video[]) => {
      this.videos = result;
    });
  }
  else
  {
    this.videoService.fetchVideos()
    .subscribe((result: Video[]) => {
      this.videos = result;
    });
  }

}

getUtenteId() {
  const utenteString = localStorage.getItem('utente')
  if(utenteString) {
    const user = JSON.parse(utenteString)
    return user.id
  }
  else{
    return null;
  }
}

}
