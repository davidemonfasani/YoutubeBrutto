import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { UploadVideoComponent } from '../pages/upload-video/upload-video.component';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private http : HttpClient, private router: Router, private dialog: MatDialog) {
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

  uploadPopUp() {
      const dialogRef = this.dialog.open(UploadVideoComponent, {
    width: '400px', // Adjust the width as per your requirement
    // Add any other necessary configuration options for the pop-up
  });

  // Optionally, handle the dialog result or any other actions after the pop-up is closed
  dialogRef.afterClosed().subscribe(result => {
    // Handle the result or perform any other actions
  });

  }
}
