import { Component, Input } from '@angular/core';
import { Utente } from 'src/app/interfaces/utente';

@Component({
  selector: 'app-channel-card',
  templateUrl: './channel-card.component.html',
  styleUrls: ['./channel-card.component.css']
})
export class ChannelCardComponent {
  @Input() utente!: Utente
}
