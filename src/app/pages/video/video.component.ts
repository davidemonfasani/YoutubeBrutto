import { Component, HostListener, OnInit  } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { VideoService } from 'src/app/services/video.service';
import { Commento } from 'src/app/interfaces/commento';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Video } from 'src/app/interfaces/video';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/services/user-auth.service';

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
  utenteLiked: boolean;
  verificato = false; iscritto: boolean;
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
    private auth : UserAuthService
    ) {
      this.utenteLiked = false;
      this.iscritto = false;
      this.CommentForm = this.formBuilder.group({
        Text: ['', Validators.required],
      });
    }


  showDescription = false;

  toggleDescription() {
    this.showDescription = !this.showDescription;
  }

  trySubscribe() {
    const body = {
      idiscritto: this.getUtenteId(),
      idvideo: this.body.id
    };

    if (this.iscritto) {
      this.auth.unsubscribe(body).subscribe();
      this.checksub(body)
    } else {
      this.auth.subscribe(body).subscribe();
      this.checksub(body)

    }

  }

checksub(body : any) {
  this.auth.checksub(body).subscribe((response: boolean) => {
    this.iscritto = response;
    if (this.iscritto) {
      this.iscritto = false
    } else {
      this.iscritto = true
    }
  });
}


  sanitize(a : string) {
    return this.vidService.sanitizeVideoUrl(a)
  }
  ngOnInit() {
    window.onbeforeunload = () => {
      if(this.verificato)
    {
      clearTimeout(this.timer);
      this.elapsedTime = Date.now() - this.startTime;
      this.addView()
    }
    }

        const body = {
      idiscritto: this.getUtenteId(),
      idvideo: this.body.id
    };

    this.checksub(body)

    this.fetchViews()

    this.vidService.getVideo().subscribe((video) => {
      this.body = video;
    });
    this.utente = this.getUtente();
    this.fetchLikes();
    this.fetchViews();
    this.fetchComments();

      //console.log('prendo i commenti di:', this.body.id);

      this.startTime = Date.now();
      this.timer = setTimeout(() => {

        console.log('60 seconds have passed. Performing action...');
        // Perform your desired action here
        this.verificato = true
      }, 10000);




  }




  ngOnDestroy() {
  window.onbeforeunload = null;
    if(this.verificato)
    {
      clearTimeout(this.timer);
      this.elapsedTime = Date.now() - this.startTime;
      this.addView()
    }

    // Execute your desired action here
  }




  likeChange() {
    const idUtente = this.utente.id;
    const idVideo = this.body.id;
    if (this.utenteLiked) {
      this.utenteLiked = false;
      this.vidService.removeLike(idUtente, idVideo).then((observable) => {
        observable.subscribe(() => {
          this.fetchLikes();
        });
      });
    } else {
      this.utenteLiked = true;
      this.vidService.addLike(idUtente, idVideo).then((observable) => {
        observable.subscribe(() => {
          this.fetchLikes();
        });
      });
    }
  }





  fetchLikes() {
    let utenteid = this.utente.id;
    if (utenteid === null) {
      utenteid = 0;
    }
    this.vidService.fetchLikes(utenteid).subscribe((result: { UtenteLiked: boolean; likes: number }) => {
      this.utenteLiked = result.UtenteLiked;

      this.likes = result.likes;
    });
  }


  fetchViews() {
    this.vidService.fetchViews(this.body.id)
      .subscribe((response: { views: number }) => {
        this.views = response.views;
        console.log('le views', this.views);
      });
  }





  fetchComments() {
    this.comService.fetchComments(this.body.id)
      .subscribe((result: Commento[]) => {
        this.comments = result;
        //console.log('i commenti', this.comments)
      });
  }



  registerComment() {

    const bodyComment = {
      video_id:this.body.id,
      utente_id:this.getUtenteId(),
      video_titolo: this.body.titolo,
      testo: this.CommentForm.value.Text,
    };
    this.comService.registerComment(bodyComment).subscribe(() => {
      this.fetchComments();
    });
  }


  getUtenteId() {
    const utenteString = localStorage.getItem('utente')
    if(utenteString) {
      const user = JSON.parse(utenteString)
      return user.id
    }
  }

  getUtente() {
    const utenteString = localStorage.getItem('utente')
    if(utenteString) {
      return  JSON.parse(utenteString)
    }
  }





  addView() {
    const idVideo = this.body.id
    const time = this.calcolaTempo((this.elapsedTime / 1000))
    const body = {
      video_id : idVideo,
      utente_id : this.getUtenteId(),
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
