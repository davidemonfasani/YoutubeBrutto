import { Component } from '@angular/core';
import { Video } from 'src/app/interfaces/video';
import { ChannelService } from 'src/app/services/channel.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent {
  user : any; personale : boolean;
  videos : Video[] = []; iscritto: boolean;
  constructor(private channelSer: ChannelService, private auth: UserAuthService) {
    this.iscritto = false;
    this.personale = false;
  }

  ngOnInit() {
    const storedUtenteId = localStorage.getItem('utenteId');
    if (storedUtenteId) {
      this.fetchChannelData(storedUtenteId);

    }

    if(localStorage.getItem('utenteId') == this.auth.getUtenteId())
    {
      this.personale = true
    }

  }


  ngOnDestroy() {
    localStorage.removeItem('utenteId');
  }

  fetchChannelData(utenteId: string) {

    this.channelSer.fetchChannel(utenteId)
      .subscribe(
        (response: any) => {
          this.videos = response.videos;
          this.user = response.user


          const body1 = {
            idiscritto: this.auth.getUtenteId(),
            idvideo: this.videos[0].id
          };
          console.log('questo è il body', body1);
          this.checksub(body1);
        },
        (error) => {
          console.error(error);
        }
      );
  }


  async trySubscribe() {
    const body = {
      idiscritto: this.getUtenteId(),
      idvideo: this.videos[0].id
    };

    if (this.iscritto) {
      try {
        await this.auth.unsubscribe(body);
        this.iscritto = false;
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await this.auth.subscribe(body);
        this.iscritto = true;
      } catch (error) {
        console.error(error);
      }
    }

    console.log('iscritto:', this.iscritto);
  }



  checksub(body : any) {

    this.auth.checksub(body).subscribe((response: boolean) => {
      this.iscritto = response;
      console.log('iscritto:', this.iscritto);
    }, error => {
      console.error(error);
    });
  }



  getUtenteId() {
    const utenteString = localStorage.getItem('utente')
    if(utenteString) {
      const user1 = JSON.parse(utenteString)
      return user1.id
    }
  }










}
