import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private router : Router){}
  primoAccesso = true
  useremail = ''
  password = ''
  firstClick = true

  goRegister() {
    this.router.navigateByUrl('/register')
  }


  tryLogin() {
    this.primoAccesso = false

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
