import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css']
})
export class AppbarComponent {
  constructor(private router: Router) {}
  firstClick = true
  ricercaValue = 'Inserisci il titolo del video...'


  clickText() {
    if(this.firstClick = true)
    {
      this.ricercaValue = ''
      this.firstClick = false
      console.log('ciao')
    }
  }

  clickProfile() {
    this.router.navigateByUrl('/profile')
    }
}
