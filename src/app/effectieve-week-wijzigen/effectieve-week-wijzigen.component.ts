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
import { Onderbreking } from '../modals/onderbreking';

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

  constructor(private router: Router, private route: ActivatedRoute, public fb: FormBuilder, private busChauffeurService: BusChauffeurService, private effectieveDienstenService: EffectieveDienstService) {
    this.route.data.subscribe(data => {
      data['effectieveDiensten'].forEach(ed => {
        if (ed.gerelateerdeDienst != undefined) {
          if (ed.start < new Date(ed.gerelateerdeDienst.start)) {
            ed.einde = new Date(ed.gerelateerdeDienst.einde);
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
        einde: [this.getDateForInput(s.einde), [Validators.required]],
        naam: [s.naam, [Validators.required]],
        andereMinuten: [s.andereMinuten, [Validators.required]],
        totaalAantalMinutenStationnement: [s.totaalAantalMinutenStationnement, [Validators.required]],
        onderbrekingen: this.fb.array([]),
        onderbrekingVisible: false
      }));
      var onderbrekingen = this.effectieveDienstenForm.at(this.effectieveDienstenForm.length - 1).get('onderbrekingen') as FormArray
      s.onderbrekingen.forEach(ond => {
        onderbrekingen.push(this.fb.group({
          id: ond.id,
          effectieveStart: [this.getDateForInput(ond.effectieveStart), [Validators.required]],
          effectiefEinde: [this.getDateForInput(ond.effectiefEinde), [Validators.required]]
        }));
      })
    })
  }

  get effectieveDienstenForm() {
    return this.effectieveDienstenAanpassenFormulier.get('effectieveDienstenForm') as FormArray;
  }

  onderbrekingen(i) {
    return this.effectieveDienstenForm.controls[i].get('onderbrekingen') as FormArray
  }

  addOnderbreking(i) {
    this.onderbrekingen(i).push(this.fb.group({
      id: '',
      effectieveStart: ['', [Validators.required]],
      effectiefEinde: ['', [Validators.required]]
    }));
  }

  deleteOnderbreking(i, index) {
    this.onderbrekingen(i).removeAt(index);
  }


  addEffectieveDienst() {
    this.effectieveDienstenForm.push(this.fb.group({
      id: '',
      start: ['', [Validators.required]],
      einde: ['', [Validators.required]],
      naam: ['', [Validators.required]],
      andereMinuten: [0, [Validators.required]],
      totaalAantalMinutenStationnement: [0, [Validators.required]],
      onderbrekingen: this.fb.array([]),
      onderbrekingVisible: false
    }));
  }

  deleteEffectieveDienst(index) {
    this.effectieveDienstenForm.removeAt(index);
  }

  changeOnderbrekingVisibility(item) {
    item.controls.onderbrekingVisible.value = !item.controls.onderbrekingVisible.value
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
      dienst.andereMinuten = ed.andereMinuten;
      dienst.start = ed.start;
      dienst.einde = ed.einde;
      dienst.busChauffeurId = this.route.snapshot.params['buschauffeurid'];
      dienst.totaalAantalMinutenStationnement = ed.totaalAantalMinutenStationnement;
      dienst.onderbrekingen = [];
      ed.onderbrekingen.forEach(stass => {
        let o = new Onderbreking();
        o.id = stass.id;
        o.effectieveStart = stass.effectieveStart;
        o.effectiefEinde = stass.effectiefEinde;
        dienst.onderbrekingen.push(o);
      })
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