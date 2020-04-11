import { Component, OnInit } from '@angular/core';
import { Dienst } from '../modals/dienst';
import { DienstService } from '../services/dienst.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dienst-overzicht',
  templateUrl: './dienst-overzicht.component.html',
  styleUrls: ['./dienst-overzicht.component.scss']
})
export class DienstOverzichtComponent implements OnInit {

  public loadingDiensten = true;
  public diensten: Dienst[];
  public errorMessage: String = null;

  constructor(private dienstService: DienstService, private router: Router) { }

  ngOnInit() {
    this.dienstService.getAllDiensten$().subscribe(
      val => {
        if (val) {
          this.diensten = val;
          this.loadingDiensten = false;
        }
      },
      error => {
        this.errorMessage = error.error;
      }
    )
  }

  redirectTo(dienst: any) {
    this.router.navigate([`../dienst-info/${dienst.id}`]);
  }

}
