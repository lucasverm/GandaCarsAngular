import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Dienst } from "../modals/dienst";
import { DienstService } from "../services/dienst.service";

@Component({
  selector: "app-dienst-overzicht",
  templateUrl: "./dienst-overzicht.component.html",
  styleUrls: ["./dienst-overzicht.component.scss"],
})
export class DienstOverzichtComponent implements OnInit {
  public loadingDiensten = true;
  public diensten: Dienst[];
  public errorMessage: String = undefined;
  public successMessage: String = undefined;

  constructor(private dienstService: DienstService, private router: Router) {}

  ngOnInit() {
    this.dienstService.getAllDiensten$().subscribe(
      (val) => {
        if (val) {
          this.diensten = val;
          this.loadingDiensten = false;
        }
      },
      (error) => {
        this.errorMessage = error.error;
      }
    );
  }

  dienstVerwijderen(d: Dienst) {
    this.dienstService.deleteDienst$(d).subscribe(
      (val) => {
        if (val) {
          this.diensten = this.diensten.filter((t) => t.id !== d.id);
          this.successMessage = `Dienst "${d.naam}" werd verwijderd!`;
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      }
    );
  }

  redirectTo(dienst: any) {
    this.router.navigate([`../dienst-wijzigen/${dienst.id}`]);
  }
}
