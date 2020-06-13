import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Router } from "@angular/router";
import { BusChauffeurService } from "../services/bus-chauffeur.service";
import { HttpErrorResponse } from "@angular/common/http";
import { DagenVanDeWeek } from "../modals/dagen-van-de-week.enum";
import { BusChauffeur } from "../modals/bus-chauffeur";
import { DienstService } from "../services/dienst.service";
import { Onderbreking } from "../modals/onderbreking";

@Component({
  selector: "app-dienst-toevoegen",
  templateUrl: "./dienst-toevoegen.component.html",
  styleUrls: ["./dienst-toevoegen.component.scss"],
})
export class DienstToevoegenComponent implements OnInit {
  public errorMessage: String = null;
  public successMessage: String = null;
  public dienstToevoegenFormulier: FormGroup;
  public dagenVanDeWeek = Object.values(DagenVanDeWeek.properties);
  public busChauffeurs: BusChauffeur[];

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private dienstService: DienstService,
    private busChauffeurService: BusChauffeurService
  ) {}

  ngOnInit() {
    this.dienstToevoegenFormulier = this.fb.group({
      naam: ["", [Validators.required]],
      startDag: ["", [Validators.required]],
      eindDag: ["", [Validators.required]],
      startUur: ["", [Validators.required]],
      eindUur: ["", [Validators.required]],
      busChauffeur: ["", [Validators.required]],
      totaalAantalMinutenStationnement: [0, [Validators.required]],
      onderbrekingen: this.fb.array([]),
    });

    this.busChauffeurService.getAllBusCheuffeurs$().subscribe(
      (val) => {
        if (val) {
          this.busChauffeurs = val;
        }
      },
      (error) => {
        this.errorMessage = error.error;
      }
    );
  }

  get onderbrekingen() {
    return this.dienstToevoegenFormulier.get("onderbrekingen") as FormArray;
  }

  addOnderbreking() {
    this.onderbrekingen.push(
      this.fb.group({
        id: [""],
        startUur: ["", [Validators.required]],
        eindUur: ["", [Validators.required]],
        startDag: ["", [Validators.required]],
        eindDag: ["", [Validators.required]],
      })
    );
  }

  deleteOnderbreking(index) {
    this.onderbrekingen.removeAt(index);
  }

  dienstToevoegen() {
    this.errorMessage = null;
    let onderbrekingen = [];
    this.dienstToevoegenFormulier.value.onderbrekingen.forEach((s) => {
      let ond = new Onderbreking();
      if (s.id != null) {
        ond.id = s.id;
      } else {
        s.id = "";
      }
      ond.startUur = s.startUur;
      ond.eindUur = s.eindUur;
      ond.startDag = s.startDag;
      ond.eindDag = s.eindDag;
      onderbrekingen.push(ond);
    });

    this.dienstService
      .addDienst$(
        this.dienstToevoegenFormulier.value.naam,
        this.dienstToevoegenFormulier.value.startDag,
        this.dienstToevoegenFormulier.value.startUur,
        this.dienstToevoegenFormulier.value.eindDag,
        this.dienstToevoegenFormulier.value.eindUur,
        this.dienstToevoegenFormulier.value.busChauffeur,
        this.dienstToevoegenFormulier.value.totaalAantalMinutenStationnement,
        onderbrekingen
      )
      .subscribe(
        (val) => {
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
