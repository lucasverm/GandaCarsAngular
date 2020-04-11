import { Component, OnInit, Input } from '@angular/core';
import { BusChauffeur } from '../modals/bus-chauffeur';

@Component({
  selector: 'app-bus-chauffeur-details',
  templateUrl: './bus-chauffeur-details.component.html',
  styleUrls: ['./bus-chauffeur-details.component.scss']
})
export class BusChauffeurDetailsComponent implements OnInit {

  @Input() busChauffeur: BusChauffeur;

  constructor() {
  }

  ngOnInit() {
    console.log(this.busChauffeur);
  }

}
