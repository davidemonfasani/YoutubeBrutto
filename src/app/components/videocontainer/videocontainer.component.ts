import { Component, Input } from '@angular/core';
import { Video } from '../../interfaces/video';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-videocontainer',
  templateUrl: './videocontainer.component.html',
  styleUrls: ['./videocontainer.component.css']
})
export class VideocontainerComponent {
  @Input() video!: Video

  constructor(private sanitizer: DomSanitizer, private router: Router, private auth: VideoService) {}

  sanitize(a : string) {
    return this.auth.sanitizeVideoUrl(a)
  }

  goVideo(){
    this.auth.goVideo(this.video)
  }

}
