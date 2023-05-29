import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

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
    public auth: UserAuthService,
    private formBuilder: FormBuilder
  ) {
    this.UploadForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  username = ''
  cognome = ''
  email = ''
  password = ''
  nome = ''
  image : any
  Upload(){
    
  }
}
