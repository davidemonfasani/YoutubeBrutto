import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserAuthService } from 'src/app/services/user-auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router : Router, private http: HttpClient, private auth: UserAuthService){}
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
      this.image = formData
  }
  const body = {
    nome : this.nome,
    cognome : this.cognome,
    email : this.email,
    password : this.password,
    username : this.username
  }


  this.auth.register(body)
}







}
