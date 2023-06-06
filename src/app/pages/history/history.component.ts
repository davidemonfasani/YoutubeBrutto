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
  hasMoreVideos=true;
  videos : Video[] = []
  constructor(private auth : UserAuthService) {}

  page=1;
ngOnInit() {
  this.getHistory()
}
loadMoreVideos() {
  this.page++;
  this.getHistory();
}

  async getHistory() {
    this.auth.getHistory().subscribe((result: Video[]) => {
      this.videos.push(...result);
      if (result.length < 8) {
        this.hasMoreVideos = false;
      }
    });
  }
}
