import { Component, OnInit } from '@angular/core';
import { EffectieveDienst } from '../modals/effectieve-dienst';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { DagenVanDeWeek } from '../modals/dagen-van-de-week.enum';
import { BusChauffeur } from '../modals/bus-chauffeur';
import { Dienst } from '../modals/dienst';
import { BusChauffeurService } from '../services/bus-chauffeur.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EffectieveDienstService } from '../services/effectieve-dienst.service';

@Component({
  selector: 'app-effectieve-week-wijzigen',
  templateUrl: './effectieve-week-wijzigen.component.html',
  styleUrls: ['./effectieve-week-wijzigen.component.scss']
})
export class EffectieveWeekWijzigenComponent implements OnInit {
  public errorMessage: String = null;
  public effectieveDienstenAanpassenFormulier: FormGroup;
  public effectieveDiensten: EffectieveDienst[] = [];
  public busChauffeur: BusChauffeur;
  public console = console;

  constructor(private router: Router, private route: ActivatedRoute, public fb: FormBuilder, private busChauffeurService: BusChauffeurService, private effectieveDienstenService: EffectieveDienstService) {
    this.route.data.subscribe(data => {
      data['effectieveDiensten'].forEach(ed => {
        if (ed.gerelateerdeDienst != undefined) {
          if (ed.start < new Date(ed.gerelateerdeDienst.start)) {
            ed.einde = new Date(ed.gerelateerdeDienst.eind);
            this.effectieveDiensten.push(ed);
          }
        } else {
          this.effectieveDiensten.push(ed);
        }
      });
    });
  }

  ngOnInit() {
    this.effectieveDienstenAanpassenFormulier = this.fb.group({
      effectieveDienstenForm: this.fb.array([])
    })
    this.initEffectieveDienstenForm();
  }

  initEffectieveDienstenForm() {
    this.effectieveDiensten.forEach(s => {
      this.effectieveDienstenForm.push(this.fb.group({
        id: s.id,
        start: [this.getDateForInput(s.start), [Validators.required]],
        eind: [this.getDateForInput(s.einde), [Validators.required]],
        naam: [s.naam, [Validators.required]],
        totaalAantalMinutenStationnement: [s.totaalAantalMinutenStationnement, [Validators.required]],
      }));
    })
  }

  get effectieveDienstenForm() {
    let uitvoer = this.effectieveDienstenAanpassenFormulier.get('effectieveDienstenForm') as FormArray;
    return uitvoer;
  }

  addEffectieveDienst() {
    this.effectieveDienstenForm.push(this.fb.group({
      id: '',
      start: ['', [Validators.required]],
      eind: ['', [Validators.required]],
      naam: ['', [Validators.required]],
      totaalAantalMinutenStationnement: [0, [Validators.required]]
    }));
  }

  deleteEffectieveDienst(index) {
    this.effectieveDienstenForm.removeAt(index);
  }

  reset() {
    this.effectieveDienstenService.deleteEffectieveDiensten$(this.route.snapshot.params['jaar'], this.route.snapshot.params['week'], this.route.snapshot.params['buschauffeurid']).subscribe(
      val => {
        if (val) {
          this.router.navigate([`../buschauffeur-info/${this.route.snapshot.params['buschauffeurid']}`]);
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      }
    );
  }

  effectieveDienstenAanpassen() {
    let effectieveDienstenToUpload: EffectieveDienst[] = [];
    this.effectieveDienstenAanpassenFormulier.value.effectieveDienstenForm.forEach(ed => {
      let dienst = this.effectieveDiensten.find(s => s.id === ed.id);
      if (dienst === undefined) {
        dienst = new EffectieveDienst();
      }
      dienst.naam = ed.naam;
      dienst.start = ed.start;
      dienst.einde = ed.eind;
      dienst.busChauffeurId = this.route.snapshot.params['buschauffeurid'];
      dienst.totaalAantalMinutenStationnement = ed.totaalAantalMinutenStationnement;
      effectieveDienstenToUpload.push(dienst);
    })
    this.effectieveDienstenService.postEffectieveDiensten$(this.route.snapshot.params['jaar'], this.route.snapshot.params['week'], this.route.snapshot.params['buschauffeurid'], effectieveDienstenToUpload).subscribe(
      val => {
        if (val) {
          this.router.navigate([`../buschauffeur-info/${this.route.snapshot.params['buschauffeurid']}`]);
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
    uitvoer += 'T' + date.toTimeString().slice(0, 5);
    return uitvoer;
  }

}