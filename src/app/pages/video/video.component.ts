import { Component } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { VideoService } from 'src/app/services/video.service';
import { Commento } from 'src/app/interfaces/commento';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {
  comments: Commento[] = [];
  constructor(private vidService : VideoService, private comService : CommentService) {}
  body = this.vidService.video

  showDescription = false;

  toggleDescription() {
    this.showDescription = !this.showDescription;
  }

  sanitize(a : string) {
    return this.vidService.sanitizeVideoUrl(a)



  }

  ngOnInit() {
    this.fetchComments();
    console.log('prendo i commenti di:', this.body.titolo)
  }

  fetchComments() {
    this.comService.fetchComments(this.body.titolo)
      .subscribe((result: Commento[]) => {
        this.comments = result;
        console.log('i comment', this.comments)
      });
  }

  registerComment() {
    const bodyComment = {
      utente_username: null,
      video_titolo: null,
      testo: null,
    };
    this.comService.registerComment(bodyComment)
  }











}
