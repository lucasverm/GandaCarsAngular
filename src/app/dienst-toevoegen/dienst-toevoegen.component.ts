import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { BusChauffeurService } from '../services/bus-chauffeur.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DagenVanDeWeek } from '../modals/dagen-van-de-week.enum';
import { BusChauffeur } from '../modals/bus-chauffeur';
import { DienstService } from '../services/dienst.service';
import { Stationnement } from '../modals/stationnement';

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


  constructor(public router: Router, private fb: FormBuilder, private dienstService: DienstService, private busChauffeurService: BusChauffeurService) {

  }

  ngOnInit() {
    this.dienstToevoegenFormulier = this.fb.group({
      naam: ['', [Validators.required]],
      startDag: ['', [Validators.required]],
      eindDag: ['', [Validators.required]],
      startUur: ['', [Validators.required]],
      eindUur: ['', [Validators.required]],
      busChauffeur: ['', [Validators.required]],
      stationnementen: this.fb.array([])
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

  get stationnementen() {
    return this.dienstToevoegenFormulier.get('stationnementen') as FormArray;
  }

  addstationnementPoint() {
    this.stationnementen.push(this.fb.group({ id: '', dag: '', startUur: '', eindUur: '', tarief: '' }));
  }

  deletestationnementPoint(index) {
    this.stationnementen.removeAt(index);
  }

  dienstToevoegen() {
    let stationnementen = [];
    this.dienstToevoegenFormulier.value.stationnementen.forEach(s => {
      let stass = new Stationnement();
      s.id = ""
      stass.dag = s.dag;
      stass.eindUur = s.eindUur;
      stass.startUur = s.startUur;
      stass.tarief = s.tarief;
      stationnementen.push(stass);
    })
    this.errorMessage = null;
    this.dienstService.addDienst$(
      this.dienstToevoegenFormulier.value.naam,
      this.dienstToevoegenFormulier.value.startDag,
      this.dienstToevoegenFormulier.value.startUur,
      this.dienstToevoegenFormulier.value.eindDag,
      this.dienstToevoegenFormulier.value.eindUur,
      this.dienstToevoegenFormulier.value.busChauffeur,
      stationnementen).subscribe(
        val => {
          if (val) {
            this.router.navigate([`../dienst-overzicht`]);
          }
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.error;
        }
      );

  }
}
