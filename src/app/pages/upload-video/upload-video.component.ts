import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent {
  @Input() response: any;
  errorMessage='';
  message='';
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
    private http : HttpClient,
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
  ngOnInit() {
    this.Service.errorMessage$.subscribe(errorMessage => {
      this.errorMessage = errorMessage;
    });
    // Initialize first two tags
    this.tags.push(this.UploadForm.value.titolo);
    this.tags.push(this.getUtente().username);
  }

  // Method to handle changes to title input field
  onTitleChange() {
    this.tags[0] = this.UploadForm.value.titolo;
  }

  deleteTag(index: number) {
    // Only allow deletion of tags with index greater than 1
    if (index > 1) {
      this.tags.splice(index, 1);
    }
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
  getUtente() {
    const utenteString = localStorage.getItem('utente')
    if(utenteString) {
      return JSON.parse(utenteString)
    }
  }
  Upload() {
    this.errorMessage = '';
    this.response = null;
    this.utente = this.getUtente();
    const body = {
      titolo: this.UploadForm.value.titolo,
      descrizione: this.UploadForm.value.descrizione,
      linkvideo: this.UploadForm.value.linkvideo,
      linkimage: this.UploadForm.value.linkimage,
      utente_id: this.utente.id,
      tags: this.tags,
    };
    this.Service.Upload(body).subscribe({
      next: (Response: any) => {
        this.response = Response;
        console.log('Response:', Response);
      },
      error: (error: any) => {
        // Handle error here
        this.errorMessage = error.error.error;
      }
    });
    }



}
