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
page=1;
hasMoreVideos=true;
ngOnInit() {
  this.fetchVideos();
}

loadMoreVideos() {
  this.page++;
  this.fetchVideos();
}


fetchVideos() {
  const utenteid = this.getUtenteId();
  if(utenteid) {
    this.videoService.sortVideos(utenteid, this.page)
    .subscribe((result: Video[]) => {
      this.videos.push(...result);
      if (result.length < 12) {
        this.hasMoreVideos = false;
      }
    });
  }
  else
  {
    this.videoService.fetchVideos(this.page)
    .subscribe((result: Video[]) => {
      this.videos.push(...result);
      if (result.length < 12) {
        this.hasMoreVideos = false;
      }

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
