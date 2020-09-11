import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BusChauffeur } from "../modals/bus-chauffeur";
import { BusChauffeurService } from "../services/bus-chauffeur.service";

@Component({
  selector: "app-bus-chauffeur-overzicht",
  templateUrl: "./bus-chauffeur-overzicht.component.html",
  styleUrls: ["./bus-chauffeur-overzicht.component.scss"],
})
export class BusChauffeurOverzichtComponent implements OnInit {
  public loadingBusChauffeurs = true;
  public busChauffeurs: BusChauffeur[];
  public errorMessage: String = undefined;
  public successMessage: String = undefined;

  constructor(private router: Router, private busChauffeurService: BusChauffeurService) {}

  ngOnInit() {
    this.busChauffeurService.getAllBusCheuffeurs$().subscribe(
      (val) => {
        if (val) {
          this.busChauffeurs = val;
          this.loadingBusChauffeurs = false;
        }
      },
      (error) => {
        this.errorMessage = error.error;
      }
    );
  }

  redirectTo(voorvoegsel: string, bc: any) {
    this.router.navigate([`../${voorvoegsel}/${bc.id}`]);
  }

  busChauffeurVerwijderen(bc: BusChauffeur) {
    this.busChauffeurService.deleteBusChauffeur$(bc).subscribe(
      (val) => {
        if (val) {
          this.busChauffeurs = this.busChauffeurs.filter((t) => t.id !== bc.id);
          this.successMessage = `Buschauffeur "${bc.voornaam} ${bc.achternaam}" werd verwijderd!`;
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      }
    );
  }
}
