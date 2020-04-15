import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DagenVanDeWeek } from '../modals/dagen-van-de-week.enum';
import { BusChauffeur } from '../modals/bus-chauffeur';
import { Dienst } from '../modals/dienst';
import { ActivatedRoute, Router } from '@angular/router';
import { DienstService } from '../services/dienst.service';
import { BusChauffeurService } from '../services/bus-chauffeur.service';
import { Stationnement } from '../modals/stationnement';
import { FeestdagenService } from '../services/feestdagen.service';
import { Feestdag } from '../modals/feestdag';

@Component({
  selector: 'app-feestdagen-aanpassen',
  templateUrl: './feestdagen-aanpassen.component.html',
  styleUrls: ['./feestdagen-aanpassen.component.scss']
})
export class FeestdagenAanpassenComponent implements OnInit {

  public successMessage: String = null;
  public errorMessage: String = null;
  public feestdagenAanpassenFormulier: FormGroup;
  public feestdagen: Feestdag[];

  constructor(public route: ActivatedRoute, public router: Router, private fb: FormBuilder, private feestdagenService: FeestdagenService) { }

  ngOnInit() {
    this.feestdagenService.getAllFeestdagen$().subscribe(
      val => {
        if (val) {
          this.feestdagen = val;
          this.initFeestdagen();
        }
      },
      error => {
        this.errorMessage = error.error;
      }
    )

    this.feestdagenAanpassenFormulier = this.fb.group({
      feestdagenForm: this.fb.array([])
    })

  }

  initFeestdagen() {
    this.feestdagen.forEach(fd => {
      this.feestdagenForm.push(this.fb.group({ dag: [this.getDateForInput(fd.dag), [Validators.required]], naam: [fd.naam, [Validators.required]] }));
    })
  }

  get feestdagenForm() {
    return this.feestdagenAanpassenFormulier.get('feestdagenForm') as FormArray;
  }

  addFeestdag() {
    this.feestdagenForm.push(this.fb.group({ dag: ['', [Validators.required]], naam: ['', [Validators.required]] }));
  }

  deleteFeestdag(index) {
    this.feestdagenForm.removeAt(index);
  }

  feestdagenAanpassen() {
    this.feestdagen = [];
    this.feestdagenAanpassenFormulier.value.feestdagenForm.forEach(fd => {
      let feestdag = new Feestdag();
      feestdag.naam = fd.naam;
      feestdag.dag = new Date(fd.dag);
      this.feestdagen.push(feestdag);
    })
    this.feestdagenService.postAllFeestdagen$(this.feestdagen).subscribe(
      val => {
        if (val) {
          this.successMessage = "Feestdag(en) werd(en) aangepast!";
        }
      },
      error => {
        console.log(error);

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
