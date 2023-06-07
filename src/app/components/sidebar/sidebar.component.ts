import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChannelService } from 'src/app/services/channel.service';
import { DialogService } from 'src/app/services/dialog.service';
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
      public channelSer : ChannelService,
      private dialogS: DialogService
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
    if (this.auth.verifyToken(localStorage.getItem('token'))) {
      localStorage.removeItem('utenteId')
      localStorage.setItem('utenteId', this.auth.getUtenteId())
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: false }).then(() => {
        this.router.navigateByUrl(`/channel?utente_id=${this.auth.getUtenteId()}`);
      });
    } else {
      this.dialogS.clear()
      this.dialogS.goLogin()
    }
  }



  goSubscriptions() {
    this.router.navigateByUrl('/subscriptions')
  }
}
