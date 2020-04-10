import { Component, OnInit } from '@angular/core';
import { BusChauffeurService } from '../services/bus-chauffeur.service';
import { BusChauffeur } from '../modals/bus-chauffeur';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bus-chauffeur-overzicht',
  templateUrl: './bus-chauffeur-overzicht.component.html',
  styleUrls: ['./bus-chauffeur-overzicht.component.scss']
})
export class BusChauffeurOverzichtComponent implements OnInit {

  public loadingBusChauffeurs = true;
  public busChauffeurs: BusChauffeur[];
  public errorMessage: String = null;

  constructor(private router: Router, private busChauffeurService: BusChauffeurService) { }

  ngOnInit() {
    this.busChauffeurService.getAllBusCheuffeurs$().subscribe(
      val => {
        if (val) {
          this.busChauffeurs = val;
          this.loadingBusChauffeurs = false;
        }
      },
      error => {
        this.errorMessage = error.error;
      }
    )
  }

  redirectTo(bc: any) {
    this.router.navigate([`../buschauffeur-info/${bc.id}`]);
  }

}
