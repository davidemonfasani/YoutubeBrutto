import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { RoutesService } from 'src/app/services/routes.service';
import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/interfaces/video';


@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css']
})
export class AppbarComponent {
  constructor(private router: Router, public routesService: RoutesService, private videoService : VideoService ) {
  }
  firstClick = true
  ricercaValue = ''


  goHomepage(){
    this.router.navigateByUrl('/homepage')

  }
  clickProfile() {
    this.router.navigateByUrl('/profile')
}


  search() {
    this.videoService.filterVideo(this.ricercaValue)
    .subscribe((result: Video[]) => {
      console.log('ciaoo')
    });
  }
}
