import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChannelService } from 'src/app/services/channel.service';
import { RoutesService } from 'src/app/services/routes.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private router: Router, public routesService: RoutesService, private channelSer : ChannelService) {}

  goHomepage() {
    this.router.navigateByUrl('/homepage')
  }

  goHistory() {
    this.router.navigateByUrl('/history')
  }

  goMyChannel() {
    const utenteString = localStorage.getItem('utente')
    if(utenteString) {
      const user1 = JSON.parse(utenteString)
      localStorage.setItem('utenteId',user1.id)
    }
    this.router.navigateByUrl('/channel')
  }

  goSubscriptions() {
    this.router.navigateByUrl('/subscriptions')
  }
}
