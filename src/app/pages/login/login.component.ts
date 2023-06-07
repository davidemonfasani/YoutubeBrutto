import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogService } from 'src/app/services/dialog.service';
@Component({
  selector: 'app-profile',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginFormAB: FormGroup;
  constructor(
    private router: Router,
    private dialogS : DialogService,
    public auth: UserAuthService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.loginFormAB = this.formBuilder.group({
      useremail: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  primoAccesso = !this.auth.isLogged

  goRegister() {
    this.dialogS.goRegister()
  }


  tryLogin() {
    const body = {
      userEmail: this.loginFormAB.value.useremail,
      password: this.loginFormAB.value.password,
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
