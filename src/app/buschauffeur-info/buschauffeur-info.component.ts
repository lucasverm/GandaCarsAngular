import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BusChauffeur } from '../modals/bus-chauffeur';

@Component({
  selector: 'app-buschauffeur-info',
  templateUrl: './buschauffeur-info.component.html',
  styleUrls: ['./buschauffeur-info.component.scss']
})
export class BuschauffeurInfoComponent implements OnInit {

  public busChauffeur: BusChauffeur;
  public errorMessage: String = null;
  public successMessage: String = null;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.busChauffeur = data['busChauffeur'];
    });
  }

  ngOnInit() {}

}
