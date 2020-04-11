import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BusChauffeurService } from '../services/bus-chauffeur.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DagenVanDeWeek } from '../modals/dagen-van-de-week.enum';
import { BusChauffeur } from '../modals/bus-chauffeur';

@Component({
  selector: 'app-dienst-toevoegen',
  templateUrl: './dienst-toevoegen.component.html',
  styleUrls: ['./dienst-toevoegen.component.scss']
})
export class DienstToevoegenComponent implements OnInit {

  public errorMessage: String = null;
  public dienstToevoegenFormulier: FormGroup;
  public dagenVanDeWeek = Object.values(DagenVanDeWeek.properties)
  public busChauffeurs: BusChauffeur[];


  constructor(public router: Router, private fb: FormBuilder, private busChauffeurService: BusChauffeurService) {

  }

  ngOnInit() {
    this.dienstToevoegenFormulier = this.fb.group({
      naam: ['', [Validators.required]],
      startDag: ['', [Validators.required]],
      eindDag: ['', [Validators.required]],
      startUur: ['', [Validators.required]],
      eindUur: ['', [Validators.required]],
      busChauffeur: ['', [Validators.required]]
    })

    this.busChauffeurService.getAllBusCheuffeurs$().subscribe(
      val => {
        if (val) {
          this.busChauffeurs = val;
        }
      },
      error => {
        this.errorMessage = error.error;
      }
    )
  }

  dienstToevoegen() {
    this.busChauffeurService.addBusChauffeur$(this.dienstToevoegenFormulier.value.voornaam, this.dienstToevoegenFormulier.value.achternaam, this.dienstToevoegenFormulier.value.uurloon).subscribe(
      val => {
        if (val) {
          //this.router.navigate([`../buschauffeur/${val.id}`], { state: { successMessage: 'Item toevoegen gelukt!' } });

        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      }
    );

  }
}
