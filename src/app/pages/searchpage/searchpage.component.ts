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


    hasMoreVideos=true;
    page=1
    videos: Video[] = [];
    constructor(private router : Router, private videoService: VideoService) {}
    ngOnInit() {
      this.videoService.filterVideo(this.page)
      .subscribe((result: Video[]) => {
        this.videos=result;
        if (result.length < 12) {
          this.hasMoreVideos = false;
        }
      });
    }
    ngOnDestroy() {
      this.page=1;
    }
    loadMoreVideos() {
      this.page++;
      this.filterVideos();
    }

    filterVideos() {
      this.videoService.filterVideo(this.page)
    .subscribe((result: Video[]) => {
      this.videos.push(...result);
      if (result.length < 12) {
        this.hasMoreVideos = false;
      }
    });
  }
}
