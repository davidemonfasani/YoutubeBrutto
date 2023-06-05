import { Component, Input } from '@angular/core';
import { Utente } from 'src/app/interfaces/utente';
import { Video } from 'src/app/interfaces/video';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-channel-card',
  templateUrl: './channel-card.component.html',
  styleUrls: ['./channel-card.component.css']
})
export class ChannelCardComponent {
  @Input() utente!: Utente
  videos : Video[] = []
  constructor(private channelSer : ChannelService) {}

  goChannel() {
    this.channelSer.goChannel(this.utente.id)
  }
}
