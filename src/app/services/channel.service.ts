import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Utente } from '../interfaces/utente';
import { HttpClient } from '@angular/common/http';
import { Video } from '../interfaces/video';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  utente = ''
  nome = ''
  constructor(private router: Router, private http: HttpClient) { }

  goChannel(utente : Utente) {
    localStorage.setItem('utenteId', utente.id.toLocaleString());
    this.router.navigateByUrl('/channel')
  }

  fetchChannel(utenteId: string): Observable<any>  {
    return this.http.get<any>(`http://127.0.0.1:8000/api/utentes/channel?userId=${utenteId}`)


}

}
