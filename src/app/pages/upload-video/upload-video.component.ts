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
  tags: string[] = [];
  inValidTag: boolean;
  taginvalidmessage='';
  titolo = ''
  descrizione= ''
  linkimage = ''
  linkvideo = ''
  utente:any
  constructor(
    private router: Router,
    private http: HttpClient,
    public Service: VideoService,
    private formBuilder: FormBuilder
  ) {
    this.inValidTag=false;
    this.UploadForm = this.formBuilder.group({
      titolo: ['', Validators.required],
      descrizione: ['', [Validators.required]],
      linkvideo: ['', Validators.required],
      linkimage: ['', Validators.required],
      newTag:[null],
    });
  }

  addTag() {
      let newTag = this.UploadForm.value.newTag;
      if (newTag!==null && newTag!=='') {
        newTag.trim();
        newTag = newTag.replace(/\s+/g, '');
        newTag=newTag.toLowerCase();
        if (/[^a-z0-9]/.test(newTag)!==true)
        {
          if (this.tags.includes(newTag)) {
            this.inValidTag= true;
            this.taginvalidmessage='tag già presente';
          }
          else
          {
          this.tags.push(newTag);
          this.UploadForm.controls['newTag'].reset();
          this.inValidTag= false;
          }
        }
        else{
          this.UploadForm.controls['newTag'].reset();
          this.inValidTag= true;
          this.taginvalidmessage='non puoi mettere caratteri speciali';
        }
      }
      else
      {
        this.inValidTag= true;
        this.taginvalidmessage='non e possibile inserire un tag vuoto';
      }
  }
  deleteTag(index: number) {
    this.tags.splice(index, 1);
  }
  getUtente() {
    const utenteString = localStorage.getItem('utente')
    if(utenteString) {
      return JSON.parse(utenteString)
    }
  }
  Upload() {
    this.utente = this.getUtente();
    const body = {
      titolo: this.UploadForm.value.titolo,
      descrizione: this.UploadForm.value.descrizione,
      linkvideo: this.UploadForm.value.linkvideo,
      linkimage: this.UploadForm.value.linkimage,
      utente_id: this.utente.id,
      tags: this.tags,
    };
    this.Service.Upload(body);
  }

}
