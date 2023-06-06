import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from 'src/app/interfaces/video';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-side-video-bar',
  templateUrl: './side-video-bar.component.html',
  styleUrls: ['./side-video-bar.component.css']
})
export class SideVideoBarComponent {

  constructor(private router : Router, private videoService: VideoService) {}

videos: Video[] = [];
hasMoreVideos=true;
page = 1;


ngOnInit() {
  this.fetchVideos();
}

loadMoreVideos() {
  this.page++;
  this.fetchVideos();
}

fetchVideos() {
  this.videoService.fetchVideosByVideoId(this.page)
    .subscribe((result: Video[]) => {
      this.videos.push(...result)
      if (result.length < 5) {
        this.hasMoreVideos = false;
      }
    });
}

}
