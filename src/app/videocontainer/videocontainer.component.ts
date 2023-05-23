import { Component, Input } from '@angular/core';
import { Video } from '../interfaces/video';

@Component({
  selector: 'app-videocontainer',
  templateUrl: './videocontainer.component.html',
  styleUrls: ['./videocontainer.component.css']
})
export class VideocontainerComponent {
  @Input() video!: Video

}
