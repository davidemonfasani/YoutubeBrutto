import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  utente : any
  utenteString = localStorage.getItem('utente')
  constructor(private auth : UserAuthService) {}

  ngOnInit() {
    if(this.utenteString) {
      this.utente = JSON.parse(this.utenteString)
    }
  }

  logOut() {
    this.auth.logOut()
  }
}
