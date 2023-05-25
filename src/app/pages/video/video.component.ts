import { Component, OnInit  } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { VideoService } from 'src/app/services/video.service';
import { Commento } from 'src/app/interfaces/commento';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Video } from 'src/app/interfaces/video';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {
  CommentForm:FormGroup;
  utente : any;
  comments: Commento[] = [];
  constructor(private vidService : VideoService,
    private comService : CommentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    ) {
      this.CommentForm = this.formBuilder.group({
        Text: ['', Validators.required],
      });
    }
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

    const utenteString = localStorage.getItem('utente')
    if(utenteString) {
      this.utente = JSON.parse(utenteString)
    }
    const bodyComment = {
      utente_username:this.utente.username,
      video_titolo: this.body.titolo,
      testo: this.CommentForm.value.Text,
    };
    this.comService.registerComment(bodyComment).subscribe(() => {
      this.fetchComments();
    });
  }











}
