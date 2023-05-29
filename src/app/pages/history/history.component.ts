import { Component } from '@angular/core';
import { Video } from 'src/app/interfaces/video';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  videos : Video[] = []
  constructor(private auth : UserAuthService) {}

  ngOnInit() {
    this.getHistory()
  }

  async getHistory() {
    this.auth.getHistory().subscribe((result: Video[]) => {
      this.videos = result;
      //console.log('i commenti', this.comments)
    });
  }
}
