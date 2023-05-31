import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private http : HttpClient, private router: Router) {
    this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
        this.getcurrentUrl();
    }
});}


  getcurrentUrl()
  {
    let currentUrl =  this.router.url;
    if (currentUrl === '/profile' || currentUrl === '/register' || currentUrl === '/login' ) {
        return false;
    }
    else
    {
    return true;
    }
  }
}
