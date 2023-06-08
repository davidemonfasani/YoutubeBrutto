import { Component, Input } from '@angular/core';
import { Commento } from 'src/app/interfaces/commento';
import { Utente } from 'src/app/interfaces/utente';
import { CommentService } from 'src/app/services/comment.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-commento',
  templateUrl: './commento.component.html',
  styleUrls: ['./commento.component.css']
})
export class CommentoComponent {
  @Input() commento!: Commento
  @Input() utente!: Utente
  utenteLiked: boolean;
  utente_id: number;
  commento_body: Commento={
    id: 0,
    utente_username: '',
    utente_id : 0,
    video_id : '',
    testo : '',
    like: 0,
    utente_pic: '',
    created_at:'',
  }
  constructor(
    private commService: CommentService,
    public vidService: VideoService,
  ){
    this.utenteLiked = false;
    this.utente_id= this.getUtente().id === null ? 0 : this.getUtente().id;
  }
  ngOnInit() {
    this.commento_body.id = this.commento.id;
    console.log('body comment:', this.utente)
    this.fetchLikes();
    }

  getUtente() {
    const utenteString = localStorage.getItem('utente')
    if(utenteString) {
      return  JSON.parse(utenteString);
    }
    else
    {
      return null;
    }
  }
  likeChange() {
    const commento_id= this.commento_body.id;
    if (this.utenteLiked) {
      this.utenteLiked = false;
      this.commService.removeLike(this.utente_id, commento_id).then((observable) => {
        observable.subscribe(() => {
          this.fetchLikes();
        });
      });
    } else {
      this.utenteLiked = true;
      this.commService.addLike(this.utente_id, commento_id).then((observable) => {
        observable.subscribe(() => {
          this.fetchLikes();
        });
      });
    }
  }
  fetchLikes() {
    const commento_id= this.commento_body.id;
    this.commService.fetchLikes(this.utente_id, commento_id).subscribe((result: { UtenteLiked: boolean; likes: number }) => {
      this.utenteLiked = result.UtenteLiked;
      console.log('risposta', result);
      console.log('UtenteLiked?', result.UtenteLiked);
      console.log('this.UtenteLiked?', this.utenteLiked);
      this.commento_body.like = result.likes;
      console.log('i like', this.commento_body.like);
    });
  }
}
