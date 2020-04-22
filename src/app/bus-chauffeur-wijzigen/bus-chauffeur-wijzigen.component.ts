import { Component, OnInit } from '@angular/core';
import { BusChauffeurResolver } from '../resolvers/bus-chauffeur.resolver';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BusChauffeur } from '../modals/bus-chauffeur';
import { BusChauffeurService } from '../services/bus-chauffeur.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-bus-chauffeur-wijzigen',
  templateUrl: './bus-chauffeur-wijzigen.component.html',
  styleUrls: ['./bus-chauffeur-wijzigen.component.scss']
})
export class BusChauffeurWijzigenComponent implements OnInit {

  public busChauffeur: BusChauffeur;
  public errorMessage: String = null;
  public successMessage: String = null;
  public busChauffeurWijzigenFormulier: FormGroup;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private busChauffeurService: BusChauffeurService) {
    this.route.data.subscribe(data => {
      this.busChauffeur = data['busChauffeur'];
    });
  }

  ngOnInit() {
    this.busChauffeurWijzigenFormulier = this.fb.group({
      voornaam: [this.busChauffeur.voornaam, [Validators.required]],
      achternaam: [this.busChauffeur.achternaam, [Validators.required]],
      uurloon: [this.busChauffeur.uurloon, [Validators.required]],
      email: [this.busChauffeur.email, [Validators.required, Validators.email]],
      geboorteDatum: [this.getDateForInput(this.busChauffeur.geboorteDatum)]
    })
  }

  chauffeurWijzigen() {
    this.busChauffeur.voornaam = this.busChauffeurWijzigenFormulier.value.voornaam;
    this.busChauffeur.achternaam = this.busChauffeurWijzigenFormulier.value.achternaam;
    this.busChauffeur.email = this.busChauffeurWijzigenFormulier.value.email;
    this.busChauffeur.geboorteDatum = new Date(this.busChauffeurWijzigenFormulier.value.geboorteDatum);
    this.busChauffeur.uurloon = this.busChauffeurWijzigenFormulier.value.uurloon;
    this.busChauffeurService.putBusChauffeur$(this.busChauffeur).subscribe(
      val => {
        if (val) {
          this.router.navigate([`../buschauffeur-overzicht`], { state: { successMessage: 'Item toevoegen gelukt!' } });
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      }
    );

  }

  getDateForInput(date: Date): string {
    var uitvoer: string = "";
    uitvoer += date.getFullYear() + "-";
    if (date.getMonth().toString().length == 1) {
      uitvoer += "0" + (date.getMonth() + 1) + "-";
    } else {
      uitvoer += (date.getMonth() + 1) + "-";
    }
    if (date.getDate().toString().length == 1) {
      uitvoer += "0" + date.getDate();
    } else {
      uitvoer += date.getDate();
    }
    return uitvoer;
  }

}
