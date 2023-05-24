import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';


@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css']
})
export class AppbarComponent {
  constructor(private router: Router, public auth: UserAuthService ) {
  }
  firstClick = true
  ricercaValue = ''


  goHomepage(){
    this.router.navigateByUrl('/homepage')

  }
  clickProfile() {
    this.router.navigateByUrl('/profile')
    }
}
