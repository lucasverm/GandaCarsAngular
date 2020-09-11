import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BusChauffeur } from "../modals/bus-chauffeur";

@Component({
  selector: "app-buschauffeur-info",
  templateUrl: "./buschauffeur-info.component.html",
  styleUrls: ["./buschauffeur-info.component.scss"],
})
export class BuschauffeurInfoComponent implements OnInit {
  public busChauffeur: BusChauffeur;
  public errorMessage: String = undefined;
  public successMessage: String = undefined;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.busChauffeur = data["busChauffeur"];
    });
  }

  ngOnInit() {}
}
