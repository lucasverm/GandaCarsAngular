import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DagenVanDeWeek } from '../modals/dagen-van-de-week.enum';
import { BusChauffeur } from '../modals/bus-chauffeur';
import { Router, ActivatedRoute } from '@angular/router';
import { DienstService } from '../services/dienst.service';
import { BusChauffeurService } from '../services/bus-chauffeur.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Dienst } from '../modals/dienst';
import { Stationnement } from '../modals/stationnement';
import { _ } from 'underscore';

@Component({
  selector: 'app-dienst-wijzigen',
  templateUrl: './dienst-wijzigen.component.html',
  styleUrls: ['./dienst-wijzigen.component.scss']
})
export class DienstWijzigenComponent implements OnInit {
  public errorMessage: String = null;
  public dienstWijzigenFormulier: FormGroup;
  public dagenVanDeWeek = Object.values(DagenVanDeWeek.properties)
  public busChauffeurs: BusChauffeur[];
  public dienst: Dienst;

  constructor(public route: ActivatedRoute, public router: Router, private fb: FormBuilder, private dienstService: DienstService, private busChauffeurService: BusChauffeurService) {
    this.route.data.subscribe(data => {
      this.dienst = data['dienst'];
    });
  }

  ngOnInit() {
    this.dienstWijzigenFormulier = this.fb.group({
      naam: [this.dienst.naam, [Validators.required]],
      startDag: [this.dienst.startDag.value, [Validators.required]],
      eindDag: [this.dienst.eindDag.value, [Validators.required]],
      startUur: [this.dienst.startUur.toLocaleTimeString(), [Validators.required]],
      eindUur: [this.dienst.eindUur.toLocaleTimeString(), [Validators.required]],
      busChauffeur: [this.dienst.busChauffeur ? this.dienst.busChauffeur.id : '', [Validators.required]],
      stationnementen: this.fb.array([])
    })
    this.initStationnementen();
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

  initStationnementen() {
    this.dienst.stationnementen.forEach(s => {
      this.stationnementen.push(this.fb.group({ id: s.id, aantalMinuten: s.aantalMinuten, percentage: s.percentage }));
    })
  }

  get stationnementen() {
    return this.dienstWijzigenFormulier.get('stationnementen') as FormArray;
  }

  addstationnementPoint() {
    this.stationnementen.push(this.fb.group({ id: '', aantalMinuten: '', percentage: '' }));
  }

  deletestationnementPoint(index) {
    this.stationnementen.removeAt(index);
  }

  dienstWijzigen() {
    this.dienst.naam = this.dienstWijzigenFormulier.value.naam;
    this.dienst.startDag = this.dienstWijzigenFormulier.value.startDag;
    this.dienst.startUur = this.dienstWijzigenFormulier.value.startUur;
    this.dienst.eindDag = this.dienstWijzigenFormulier.value.eindDag;
    this.dienst.eindUur = this.dienstWijzigenFormulier.value.eindUur;
    this.dienst.busChauffeur = this.busChauffeurs.find(t => t.id == this.dienstWijzigenFormulier.value.busChauffeur);
    this.dienst.stationnementen = [];
    this.dienstWijzigenFormulier.value.stationnementen.forEach(s => {
      let stass = new Stationnement();
      if (s.id != null) {
        stass.id = s.id
      } else {
        s.id = ""
      }
      stass.aantalMinuten = s.aantalMinuten
      stass.percentage = s.percentage;
      this.dienst.stationnementen.push(stass);
    })
    this.dienstService.putDienst$(this.dienst).subscribe(
      val => {
        if (val) {
          this.router.navigate([`../dienst-overzicht`]);
        }
      },
      error => {
        this.errorMessage = error.error;
      }
    );

  }

}