import { Component } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Playlist } from 'src/app/interfaces/playlist';
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
  videos : Video[] = []; iscritto: boolean; playlists : Playlist[] = [];banner='';bannerUrl!: SafeStyle;;
  constructor(private channelSer: ChannelService,
     private auth: UserAuthService,
     private sanitizer: DomSanitizer,
     ) {
    this.iscritto = false;
    this.personale = false;
  }

  ngOnInit() {
    const channelUtenteIdStr = this.channelSer.route.snapshot.queryParamMap.get('utente_id');
    if (channelUtenteIdStr) {
      if(this.channelSer.isMyChannel())
      {
        this.fetchMyChannelData(channelUtenteIdStr);
      }
      else
      {
        this.fetchOtherChannelData(channelUtenteIdStr);
      }

    }
  }

  ngOnDestroy() {

  }

  fetchOtherChannelData(utenteId: string) {
    this.channelSer.fetchOtherChannel(utenteId)
    .subscribe(
      (response: any) => {
        this.videos = response.videos;
        this.user = response.user
        this.playlists = response.playlists
        this.bannerUrl = this.sanitizer.bypassSecurityTrustStyle(`url(${this.banner})`);

        const body1 = {
          idiscritto: this.auth.getUtenteId(),
          idvideo: this.videos[0].id
        };
        //console.log('questo è il body', body1);
        this.checksub(body1);
      },
      (error) => {
        console.error(error);
      }
    );
  }




  fetchMyChannelData(utenteId: string) {

    this.channelSer.fetchMyChannel(utenteId)
      .subscribe(
        (response: any) => {
          this.videos = response.videos;
          this.user = response.user
          this.playlists = response.playlists
          this.banner=response.banner
          this.bannerUrl = this.sanitizer.bypassSecurityTrustStyle(`url(${this.banner})`);

          const body1 = {
            idiscritto: this.auth.getUtenteId(),
            idvideo: this.videos[0].id
          };
          //console.log('questo è il body', response);
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

    //console.log('iscritto:', this.iscritto);
  }



  checksub(body : any) {

    this.auth.checksub(body).subscribe((response: boolean) => {
      this.iscritto = response;
      //console.log('iscritto:', this.iscritto);
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
