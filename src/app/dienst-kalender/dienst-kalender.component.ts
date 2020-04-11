import {
  Component,
  Input
} from '@angular/core';
import { Dienst } from '../modals/dienst';

@Component({
  selector: 'app-dienst-kalender',
  templateUrl: './dienst-kalender.component.html',
  styleUrls: ['./dienst-kalender.component.scss']
})
export class dienstKalenderComponent {
  @Input() diensten: Dienst[];
  
  constructor() { }

  
}