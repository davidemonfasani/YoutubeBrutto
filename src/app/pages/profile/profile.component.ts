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
  loginForm: FormGroup;
  constructor(
    private router: Router,
    public auth: UserAuthService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      useremail: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  primoAccesso = true
  firstClick = true

  goRegister() {
    this.router.navigateByUrl('/register')
  }


  tryLogin() {
    const body = {
      userEmail: this.loginForm.value.useremail,
      password: this.loginForm.value.password,
    };
    this.auth.login(body);
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
