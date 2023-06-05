import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChannelService } from 'src/app/services/channel.service';
import { RoutesService } from 'src/app/services/routes.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private auth: UserAuthService,
    private router: Router,
     public routesService: RoutesService,
      public channelSer : ChannelService
      ) {}

  goHomepage() {
    this.router.navigateByUrl('/homepage')
  }
  isActive(url: string) {
    return this.router.url === url;
  }
  goHistory() {
    this.router.navigateByUrl('/history')
  }

  goMyChannel() {
      localStorage.removeItem('utenteId')
      localStorage.setItem('utenteId', this.auth.getUtenteId())
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: false }).then(() => {
        this.router.navigateByUrl(`/channel?utente_id=${this.auth.getUtenteId()}`);
  });

  }
  goSubscriptions() {
    this.router.navigateByUrl('/subscriptions')
  }
}
