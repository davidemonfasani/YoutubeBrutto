import { Component, Input } from '@angular/core';
import { Video } from '../interfaces/video';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videocontainer',
  templateUrl: './videocontainer.component.html',
  styleUrls: ['./videocontainer.component.css']
})
export class VideocontainerComponent {
  @Input() video!: Video

  constructor(private sanitizer: DomSanitizer) {}

  sanitizeVideoUrl(videoUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }
}
