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

    page=1
    videos: Video[] = [];
    ngOnInit() {
      this.filterVideos();
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
    ngOnDestroy() {
      window.removeEventListener('scroll', this.onScroll.bind(this));
    }
    onScroll() {
      // Check if the user has scrolled to the bottom of the page
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          this.page++;
          this.filterVideos();
      }
    }

    filterVideos() {
      this.videoService.filterVideo(this.page)
    .subscribe((result: Video[]) => {
      this.videos = result;
    });
  }
}
