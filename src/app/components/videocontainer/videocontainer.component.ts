import { Component, Input, OnInit} from '@angular/core';
import { Video } from '../../interfaces/video';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { VideoService } from '../../services/video.service';
import { ActivatedRoute } from '@angular/router';
import { ChannelService } from 'src/app/services/channel.service';





@Component({
  selector: 'app-videocontainer',
  templateUrl: './videocontainer.component.html',
  styleUrls: ['./videocontainer.component.css']
})
export class VideocontainerComponent {
  @Input() video!: Video

  constructor(private sanitizer: DomSanitizer,
     private router: Router,
      private auth: VideoService,
      private route: ActivatedRoute,
      private channelSer: ChannelService
      ) {

      }
ngOnInit(){
//console.log(this.video)
 }
  sanitize(a : string) {
    return this.auth.sanitizeVideoUrl(a)
  }
  goChannel(event: Event) {
    event.stopPropagation();
    console.log(this.video.utente_id, 'videoutente id ');
    this.channelSer.goChannel(this.video.utente_id);
  }
  goVideo(){
    console.log(this.video.utente_id, 'videoutente id ');
    this.auth.goVideo(this.video)
  }

}

