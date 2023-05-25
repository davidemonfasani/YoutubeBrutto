import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { RoutesService } from 'src/app/services/routes.service';


@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css']
})
export class AppbarComponent {
  constructor(private router: Router, public routesService: RoutesService ) {
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
