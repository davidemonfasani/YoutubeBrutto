import { Component, HostListener, OnInit  } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { VideoService } from 'src/app/services/video.service';
import { Commento } from 'src/app/interfaces/commento';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Video } from 'src/app/interfaces/video';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { catchError, finalize, from } from 'rxjs';
import { PlaylistPopupComponent } from 'src/app/components/playlist-popup/playlist-popup.component';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {
  elapsedTime! : number; minuti = 0;
  CommentForm:FormGroup;
  utente : any; timer : any;
  startTime!: number; personale : boolean;
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
    utente_iscrizioni_count: 0,
    utente_id : 0,
  };
  idUt : number
  constructor(public vidService : VideoService,
    private comService : CommentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private auth : UserAuthService,
    private playService : PlaylistService
    ) {
      this.idUt = 0
      this.utenteLiked = false;
      this.iscritto = false;
      this.personale = false;
      this.CommentForm = this.formBuilder.group({
        Text: ['', Validators.required],
      });

    }


  showDescription = false;

  toggleDescription() {
    this.showDescription = !this.showDescription;
  }

  async trySubscribe() {
    const body = {
      idiscritto: this.getUtenteId(),
      idvideo: this.body.id
    };

    if (this.iscritto) {
      try {
        await this.auth.unsubscribe(body);
        this.iscritto = false;
        this.onVideoLoad()
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await this.auth.subscribe(body);
        this.iscritto = true;
        this.onVideoLoad()
      } catch (error) {
        console.error(error);
      }
    }

    console.log('iscritto:', this.iscritto);
  }

  onVideoLoad(){

    this.vidService.getVideo().subscribe((video) => {
      this.body = video;
      console.log(this.body);
      this.idUt = video.utente_id
      if(this.idUt == this.auth.getUtenteId())
      {

        this.personale = true
      }
      console.log('questo è id utente', this.body.utente_id, 'mentre questo local', this.auth.getUtenteId())

      const bodyA = {
        idiscritto: this.getUtenteId(),
        idvideo: video.id,
      };
      this.checksub(bodyA)

    });
  }

  checksub(body: any) {
    this.auth.checksub(body).subscribe((response: boolean) => {
      this.iscritto = response;
      console.log('iscritto:', this.iscritto);
    }, error => {
      console.error(error);
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
    this.onVideoLoad()
    this.fetchViews()
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


  managePlaylist() {
    this.playService.managePlaylist()
  }
}
