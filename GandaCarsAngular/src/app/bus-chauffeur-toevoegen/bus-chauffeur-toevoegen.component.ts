import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BusChauffeurService } from "../services/bus-chauffeur.service";

@Component({
  selector: "app-bus-chauffeur-toevoegen",
  templateUrl: "./bus-chauffeur-toevoegen.component.html",
  styleUrls: ["./bus-chauffeur-toevoegen.component.scss"],
})
export class BusChauffeurToevoegenComponent implements OnInit {
  public errorMessage: String = undefined;
  public successMessage: String = undefined;
  public busChauffeurToevoegenFormulier: FormGroup;

  constructor(public router: Router, private fb: FormBuilder, private busChauffeurService: BusChauffeurService) {}

  ngOnInit() {
    this.busChauffeurToevoegenFormulier = this.fb.group({
      voornaam: ["", [Validators.required]],
      achternaam: ["", [Validators.required]],
      uurloon: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      geboorteDatum: [""],
    });
  }

  chauffeurToevoegen() {
    this.busChauffeurService
      .addBusChauffeur$(
        this.busChauffeurToevoegenFormulier.value.voornaam,
        this.busChauffeurToevoegenFormulier.value.achternaam,
        this.busChauffeurToevoegenFormulier.value.uurloon,
        this.busChauffeurToevoegenFormulier.value.email,
        this.busChauffeurToevoegenFormulier.value.geboorteDatum
      )
      .subscribe(
        (val) => {
          if (val) {
            this.router.navigate([`../buschauffeur-overzicht`], {
              state: { successMessage: "Item toevoegen gelukt!" },
            });
          }
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.error;
        }
      );
  }
}
