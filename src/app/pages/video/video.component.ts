import { Component, OnInit  } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { VideoService } from 'src/app/services/video.service';
import { Commento } from 'src/app/interfaces/commento';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Video } from 'src/app/interfaces/video';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {
  comments: Commento[] = [];
  constructor(private vidService : VideoService, private comService : CommentService, private route: ActivatedRoute) {}
  body: Video = {
    titolo : '',
    descrizione : '',
    linkvideo : '',
    linkimage : '',
    utente_username : '',
  };

  showDescription = false;

  toggleDescription() {
    this.showDescription = !this.showDescription;
  }

  sanitize(a : string) {
    return this.vidService.sanitizeVideoUrl(a)
  }
  ngOnInit() {
    this.vidService.getVideo().subscribe((video) => {
      console.log(video);

      this.body = video;
    });
    this.fetchComments();
      console.log('prendo i commenti di:', this.body.titolo);
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
