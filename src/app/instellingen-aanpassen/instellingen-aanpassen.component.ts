import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Feestdag } from '../modals/feestdag';
import { ActivatedRoute, Router } from '@angular/router';
import { FeestdagenService } from '../services/feestdagen.service';
import { InstellingenService } from '../services/instellingen.service';
import { Instellingen } from '../modals/instellingen';

@Component({
  selector: 'app-instellingen-aanpassen',
  templateUrl: './instellingen-aanpassen.component.html',
  styleUrls: ['./instellingen-aanpassen.component.scss']
})
export class InstellingenAanpassenComponent implements OnInit {

  public successMessage: String = null;
  public errorMessage: String = null;
  public instellingenAanpassenFormulier: FormGroup;
  public instellingen: Instellingen;

  constructor(public route: ActivatedRoute, public router: Router, private fb: FormBuilder, private instellingenService: InstellingenService) {
    this.route.data.subscribe(data => {
      this.instellingen = data['instellingen'];
    });
  }


  ngOnInit() {
    this.instellingenAanpassenFormulier = this.fb.group({
      aantalMinutenAdministratieveTijdVoorDienst: [this.instellingen.aantalMinutenAdministratieveTijdVoorDienst, [Validators.required]],
      stelsel: [this.instellingen.stelsel, [Validators.required]]
    })
  }

  instellingenOpslaan() {
    this.instellingen.aantalMinutenAdministratieveTijdVoorDienst = this.instellingenAanpassenFormulier.value.aantalMinutenAdministratieveTijdVoorDienst
    this.instellingen.stelsel = this.instellingenAanpassenFormulier.value.stelsel
    this.instellingenService.putInstellingen$(this.instellingen).subscribe(
      val => {
        if (val) {
          this.successMessage = "Instellingen opgeslaan!";
        }
      },
      error => {
        this.errorMessage = error.error;
      }
    );

  }


}
