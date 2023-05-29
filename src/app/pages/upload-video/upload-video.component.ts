import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent {
  UploadForm: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    public Service: VideoService,
    private formBuilder: FormBuilder
  ) {
    this.UploadForm = this.formBuilder.group({
      titolo: ['', Validators.required],
      descrizione: ['', [Validators.required]],
      linkvideo: ['', Validators.required],
      linkimage: ['', Validators.required],
    });
  }
  titolo = ''
  descrizione= ''
  linkimage = ''
  linkvideo = ''
  utente:any
  getUtente() {
    const utenteString = localStorage.getItem('utente')
    if(utenteString) {
      return JSON.parse(utenteString)
    }
  }
  Upload(){
    this.utente = this.getUtente()
    const body = {
      titolo: this.UploadForm.value.titolo,
      descrizione: this.UploadForm.value.descrizione,
      linkvideo: this.UploadForm.value. linkvideo,
      linkimage: this.UploadForm.value.linkimage,
      utente_id: this.utente.id,
    };
    this.Service.Upload(body);
  }
}
