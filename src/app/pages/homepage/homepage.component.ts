import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
constructor(private router : Router) {}
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
