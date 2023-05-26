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
  elapsedTime! : number; minuti = 0;
  CommentForm:FormGroup;
  utente : any; timer : any;
  startTime!: number;
  comments: Commento[] = [];
  likes = 0;
  views = 0;
  condition =false;
  verificato = false;
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
      console.log(video);
      this.body = video;
    });
    this.fetchComments();

      console.log('prendo i commenti di:', this.body.id);

      this.startTime = Date.now();
      this.timer = setTimeout(() => {

        console.log('60 seconds have passed. Performing action...');
        // Perform your desired action here
        this.verificato = true
      }, 60000);


  }


  ngOnDestroy() {
    // Perform your action before the component is closed
    if(this.verificato)
    {
      clearTimeout(this.timer);
      this.elapsedTime = Date.now() - this.startTime;
      this.addView()
    }

    // Execute your desired action here
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
    this.vidService.fetchLikes(this.body.id)
    .subscribe((result: number) => {
      this.likes = result;
      console.log('i comment', this.comments)
    });
  }


  fetchViews() {
    this.vidService.fetchViews(this.body.id)
    .subscribe((result: number) => {
      this.views = result;
      console.log('i comment', this.comments)
    });
  }


  fetchComments() {
    this.comService.fetchComments(this.body.id)
      .subscribe((result: Commento[]) => {
        this.comments = result;
        console.log('i comment', this.comments)
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





  addView() {
    this.utente = this.getUtente()
    const idUtente = this.utente.id
    const idVideo = this.body.id
    const time = this.calcolaTempo((this.elapsedTime / 1000))
    const body = {
      video_id : idVideo,
      utente_id : idUtente,
      watch_time : time,
    }
    this.elapsedTime = 0;
    this.vidService.addView(body)
  }



  calcolaTempo(n : number) {
    const variabilina = n / 60
    this.minuti += Math.floor(variabilina)
    const variabilinaVirgola = variabilina % 1 * 60;
    if(variabilinaVirgola >= 30)
    {
     return this.minuti += 1;
    }
    else
    {
      return this.minuti
    }
  }











}
