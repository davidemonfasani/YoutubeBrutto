import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http : HttpClient) { }



  register(body : any) {

    this.http.post('/api/upload', body).subscribe(
      (response) => {
        console.log('Image uploaded successfully');
        // Handle the response from the server, if needed
      },
      (error) => {
        console.error('Error uploading image:', error);
        // Handle the error, if needed
      }
    );
  }
}
