import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Instellingen } from "../modals/instellingen";
import { InstellingenService } from "../services/instellingen.service";

@Component({
  selector: "app-instellingen-aanpassen",
  templateUrl: "./instellingen-aanpassen.component.html",
  styleUrls: ["./instellingen-aanpassen.component.scss"],
})
export class InstellingenAanpassenComponent implements OnInit {
  public successMessage: String = undefined;
  public errorMessage: String = undefined;
  public instellingenAanpassenFormulier: FormGroup;
  public instellingen: Instellingen;

  constructor(public route: ActivatedRoute, public router: Router, private fb: FormBuilder, private instellingenService: InstellingenService) {
    this.route.data.subscribe((data) => {
      this.instellingen = data["instellingen"];
    });
  }

  ngOnInit() {
    this.instellingenAanpassenFormulier = this.fb.group({
      aantalMinutenAdministratieveTijdVoorDienst: [this.instellingen.aantalMinutenAdministratieveTijdVoorDienst, [Validators.required]],
      stelsel: [this.instellingen.stelsel, [Validators.required]],
    });
  }

  instellingenOpslaan() {
    this.instellingen.aantalMinutenAdministratieveTijdVoorDienst = this.instellingenAanpassenFormulier.value.aantalMinutenAdministratieveTijdVoorDienst;
    this.instellingen.stelsel = this.instellingenAanpassenFormulier.value.stelsel;
    this.instellingenService.putInstellingen$(this.instellingen).subscribe(
      (val) => {
        if (val) {
          this.successMessage = "Instellingen opgeslaan!";
        }
      },
      (error) => {
        this.errorMessage = error.error;
      }
    );
  }
}
