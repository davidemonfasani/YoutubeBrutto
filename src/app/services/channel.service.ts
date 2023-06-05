  import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utente } from '../interfaces/utente';
import { HttpClient } from '@angular/common/http';
import { Video } from '../interfaces/video';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  utente = ''
  nome = ''
  constructor(private router: Router,
     private http: HttpClient,
     private auth: UserAuthService,
     public route: ActivatedRoute,

     ) { }
   isMyChannel(): boolean {
    const channelUtenteIdStr = this.route.snapshot.queryParamMap.get('utente_id');
    let channelUtenteId: number | null = null;
    if (channelUtenteIdStr !== null) {
      channelUtenteId = parseInt(channelUtenteIdStr);
    }
      return channelUtenteId  === this.auth.getUtenteId();
    }
  goChannel(utente_id : Number) {
    //localStorage.setItem('utenteId', utente_id.toLocaleString());
    this.router.navigateByUrl(`/channel?utente_id=${utente_id}`);
  }

  fetchMyChannel(utenteId: string): Observable<any>  {

    return this.http.get<any>(`http://127.0.0.1:8000/api/utentes/mychannel?userId=${utenteId}`)
}

  fetchOtherChannel(utenteId: string): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/utentes/channel?userId=${utenteId}`)
  }


}
