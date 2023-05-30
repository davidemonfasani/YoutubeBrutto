import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { RoutesService } from 'src/app/services/routes.service';
import { VideoService } from 'src/app/services/video.service';
import { Video } from 'src/app/interfaces/video';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css']
})
export class AppbarComponent {
  SearchForm: FormGroup;
  constructor(private router: Router,
     public routesService: RoutesService,
     private videoService : VideoService,
     private UtenteAuth:UserAuthService,
     private formBuilder: FormBuilder,
  ) {
    this.SearchForm = this.formBuilder.group({
      Search: ['', Validators.required],
    });
  }
  firstClick = true


Userlogged(){
  return  this.UtenteAuth.verifyToken(localStorage.getItem('token'));
}
  goHomepage(){
    this.router.navigateByUrl('/homepage')

  }
  clickProfile() {
    this.router.navigateByUrl('/profile')
}

  GoUploadPage(){
  this.router.navigateByUrl('/upload')
  }

  search() {
    this.videoService.filterVideo(this.SearchForm.value.Search)
    .subscribe((result: Video[]) => {
      console.log('ciaoo')
    });
  }
}
