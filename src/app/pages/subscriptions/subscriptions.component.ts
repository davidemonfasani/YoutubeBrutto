import { Component } from '@angular/core';
import { Utente } from 'src/app/interfaces/utente';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent {
  subs : Utente[] = []

  constructor(private auth: UserAuthService) {}
  ngOnInit() {

    this.fetchSubs()

  }


  async fetchSubs() {
    this.auth.fetchSubs().subscribe((result: Utente[]) => {
      this.subs = result;
      //console.log('i commenti', this.comments)
    });
  }

}
