import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    public auth: UserAuthService,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      password: ['', Validators.required],
      image: [null,],
    });
  }
  username = ''
  cognome = ''
  email = ''
  password = ''
  nome = ''
  image : any

  goLogin() {
    this.router.navigateByUrl('/profile')
  }

  goHomepage(){
    this.router.navigateByUrl('/homepage')
  }


  selectedFile: File | null = null

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}


tryRegister() {
  if (this.selectedFile) {
    const formData = new FormData();
    this.image = formData;
  }
  const body = {
    nome: this.registerForm.value.nome,
    cognome: this.registerForm.value.cognome,
    email: this.registerForm.value.email,
    password: this.registerForm.value.password,
    username: this.registerForm.value.username,
    linkppic: this.registerForm.value.image,
  };

  this.auth.register(body);
}
}


