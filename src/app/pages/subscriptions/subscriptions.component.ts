import { Component } from '@angular/core';
import { Utente } from 'src/app/interfaces/utente';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent {


  constructor(private auth: UserAuthService) {}
  ngOnInit() {

    this.fetchSubs()

  }


  async fetchSubs() {
    this.auth.fetchSubs().subscribe((response : any) => {
      console.log(response)
    })
  }

}
