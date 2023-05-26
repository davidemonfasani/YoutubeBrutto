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
  likes = 0;
  views = 0;
  condition =false;

  body: Video = {
    id: 0,
    titolo : '',
    descrizione : '',
    linkvideo : '',
    linkimage : '',
    utente_username : '',
  };
  constructor(private vidService : VideoService,
    private comService : CommentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    ) {
      this.CommentForm = this.formBuilder.group({
        Text: ['', Validators.required],
      });
    }


  showDescription = false;

  toggleDescription() {
    this.showDescription = !this.showDescription;
  }

  sanitize(a : string) {
    return this.vidService.sanitizeVideoUrl(a)
  }
  ngOnInit() {
    this.vidService.getVideo().subscribe((video) => {
      this.body = video;
    });
    this.fetchComments();
    this.fetchLikes();
    this.fetchViews();
  }



  likeChange(){
    this.utente = this.getUtente()
    const idUtente = this.utente.id
    const idVideo = this.body.id
    if(this.condition)
    {
      this.condition=false
      this.vidService.removeLike(idUtente, idVideo)
    }
    else
    {
      this.condition=true
      this.vidService.addLike(idUtente, idVideo)
    }

  }


  fetchLikes() {
    let utenteid=this.getUtente().id;
    if(utenteid===null)
    {
      utenteid=0;
    }
    this.vidService.fetchLikes(utenteid)
    .subscribe((result: number) => {
      this.likes=result.valueOf();
      console.log('i like',  this.likes)
    });
  }


  fetchViews() {
    this.vidService.fetchViews(this.body.id)
    .subscribe((result: number) => {
      this.views = result;
      console.log('le views', this.views)
    });
  }


  fetchComments() {
    this.comService.fetchComments(this.body.id)
      .subscribe((result: Commento[]) => {
        this.comments = result;
        console.log('i commenti', this.comments)
      });
  }



  registerComment() {

    this.utente = this.getUtente()
    const bodyComment = {
      video_id:this.body.id,
      utente_id:this.utente.id,
      video_titolo: this.body.titolo,
      testo: this.CommentForm.value.Text,
    };
    this.comService.registerComment(bodyComment).subscribe(() => {
      this.fetchComments();
    });
  }


  getUtente() {
    const utenteString = localStorage.getItem('utente')
    if(utenteString) {
      return JSON.parse(utenteString)
    }
  }
}
