import { Component, Input } from '@angular/core';
import { Commento } from 'src/app/interfaces/commento';

@Component({
  selector: 'app-commento',
  templateUrl: './commento.component.html',
  styleUrls: ['./commento.component.css']
})
export class CommentoComponent {
  @Input() commento!: Commento


}
