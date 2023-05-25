import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesService } from 'src/app/services/routes.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private router: Router, public routesService: RoutesService) {}

  goHomepage() {
    this.router.navigateByUrl('/homepage')
  }

  goHistory() {
    this.router.navigateByUrl('/history')
  }

  goSubscriptions() {
    this.router.navigateByUrl('/subscriptions')
  }
}
