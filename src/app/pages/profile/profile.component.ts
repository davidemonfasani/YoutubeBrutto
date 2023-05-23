import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private router : Router, private auth : UserAuthService){}
  primoAccesso = true
  useremail = ''
  password = ''
  firstClick = true

  goRegister() {
    this.router.navigateByUrl('/register')
  }


  tryLogin() {

    const body = {
      userEmail : this.useremail,
      password : this.password,
    }
    this.auth.login(body)
  }

  // clickText(value : string) {
  //   if(this.firstClick = true)
  //   {
  //     if (value = this.useremail)
  //     {
  //       this.useremail = ''
  //     }
  //     else
  //     {
  //       this.password = ''
  //     }
  //     this.firstClick = false
  //     console.log('ciao')
  //   }
  // }
}
