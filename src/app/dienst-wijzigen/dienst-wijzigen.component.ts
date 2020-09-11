import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BusChauffeur } from "../modals/bus-chauffeur";
import { DagenVanDeWeek } from "../modals/dagen-van-de-week.enum";
import { Dienst } from "../modals/dienst";
import { Onderbreking } from "../modals/onderbreking";
import { BusChauffeurService } from "../services/bus-chauffeur.service";
import { DienstService } from "../services/dienst.service";

@Component({
  selector: "app-dienst-wijzigen",
  templateUrl: "./dienst-wijzigen.component.html",
  styleUrls: ["./dienst-wijzigen.component.scss"],
})
export class DienstWijzigenComponent implements OnInit {
  public errorMessage: String = undefined;
  public successMessage: String = undefined;
  public dienstWijzigenFormulier: FormGroup;
  public dagenVanDeWeek = Object.values(DagenVanDeWeek.properties);
  public busChauffeurs: BusChauffeur[];
  public dienst: Dienst;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private dienstService: DienstService,
    private busChauffeurService: BusChauffeurService
  ) {
    this.route.data.subscribe((data) => {
      this.dienst = data["dienst"];
    });
  }

  ngOnInit() {
    this.dienstWijzigenFormulier = this.fb.group({
      naam: [this.dienst.naam, [Validators.required]],
      startDag: [this.dienst.startDag.value, [Validators.required]],
      eindDag: [this.dienst.eindDag.value, [Validators.required]],
      startUur: [this.dienst.startUur.toLocaleTimeString(), [Validators.required]],
      eindUur: [this.dienst.eindUur.toLocaleTimeString(), [Validators.required]],
      busChauffeur: [this.dienst.busChauffeur ? this.dienst.busChauffeur.id : "", [Validators.required]],
      totaalAantalMinutenStationnement: [this.dienst.totaalAantalMinutenStationnement, [Validators.required]],
      onderbrekingen: this.fb.array([]),
    });
    this.initOnderbrekingen();
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

  initOnderbrekingen() {
    this.dienst.onderbrekingen.forEach((s) => {
      this.onderbrekingen.push(
        this.fb.group({
          id: [s.id],
          startUur: [s.startUur.toLocaleTimeString(), [Validators.required]],
          eindUur: [s.eindUur.toLocaleTimeString(), [Validators.required]],
          startDag: [s.startDag.value, [Validators.required]],
          eindDag: [s.eindDag.value, [Validators.required]],
        })
      );
    });
  }

  get onderbrekingen() {
    return this.dienstWijzigenFormulier.get("onderbrekingen") as FormArray;
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

  dienstWijzigen() {
    this.dienst.naam = this.dienstWijzigenFormulier.value.naam;
    this.dienst.startDag = this.dienstWijzigenFormulier.value.startDag;
    this.dienst.startUur = this.dienstWijzigenFormulier.value.startUur;
    this.dienst.eindDag = this.dienstWijzigenFormulier.value.eindDag;
    this.dienst.eindUur = this.dienstWijzigenFormulier.value.eindUur;
    this.dienst.busChauffeur = this.busChauffeurs.find((t) => t.id === this.dienstWijzigenFormulier.value.busChauffeur);
    this.dienst.totaalAantalMinutenStationnement = this.dienstWijzigenFormulier.value.totaalAantalMinutenStationnement;
    this.dienst.onderbrekingen = [];
    this.dienstWijzigenFormulier.value.onderbrekingen.forEach((s) => {
      let ond = new Onderbreking();
      if (s.id !== undefined) {
        ond.id = s.id;
      } else {
        s.id = "";
      }
      ond.startUur = s.startUur;
      ond.eindUur = s.eindUur;
      ond.startDag = s.startDag;
      ond.eindDag = s.eindDag;
      this.dienst.onderbrekingen.push(ond);
    });

    this.dienstService.putDienst$(this.dienst).subscribe(
      (val) => {
        if (val) {
          this.router.navigate([`../dienst-overzicht`]);
        }
      },
      (error) => {
        this.errorMessage = error.error;
      }
    );
  }
}
