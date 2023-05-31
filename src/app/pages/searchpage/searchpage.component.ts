import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from 'src/app/interfaces/video';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent {
    constructor(private router : Router, private videoService: VideoService) {}

    videos: Video[] = [];

    ngOnInit() {
      this.videoService.filterVideo()
    .subscribe((result: Video[]) => {
      this.videos = result;
    });
  }
}
