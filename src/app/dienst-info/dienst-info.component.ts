import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Dienst } from "../modals/dienst";

@Component({
  selector: "app-dienst-info",
  templateUrl: "./dienst-info.component.html",
  styleUrls: ["./dienst-info.component.scss"],
})
export class DienstInfoComponent implements OnInit {
  public dienst: Dienst;
  public errorMessage: String = undefined;
  public successMessage: String = undefined;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.dienst = data["dienst"];
    });
  }

  ngOnInit() {}

  redirectTo(bc: any) {
    this.router.navigate([`../buschauffeur-info/${bc.id}`]);
  }
}
