import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http : HttpClient) { }



  register(body : any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

    const option = {headers: headers};

    this.http.post('/api/upload', body, option).subscribe(
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


  login(body : any) {

  }
}
