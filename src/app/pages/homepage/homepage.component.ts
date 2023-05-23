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
  this.videoService.fetchVideos()
    .subscribe((result: Video[]) => {
      this.videos = result;
    });
}



}
