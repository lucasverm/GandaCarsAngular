import { Component, OnInit, Input } from '@angular/core';
import { BusChauffeur } from '../modals/bus-chauffeur';
import { Router, ActivatedRoute } from '@angular/router';
import { ExcelService } from '../services/excel.service';
import * as moment from 'moment';
import { FeestdagenService } from '../services/feestdagen.service';
import { Feestdag } from '../modals/feestdag';

@Component({
  selector: 'app-toon-loonlijst',
  templateUrl: './toon-loonlijst.component.html',
  styleUrls: ['./toon-loonlijst.component.scss']
})
export class ToonLoonlijstComponent implements OnInit {

  //https://medium.com/@madhavmahesh/exporting-an-excel-file-in-angular-927756ac9857
  public busChauffeur: BusChauffeur;
  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
  }, {
    eid: 'e102',
    ename: 'ram',
    esal: 2000
  }, {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
  }];

  public maand: moment.Moment = moment();
  public feestdagen: Feestdag[] = [];
  public errorMessage: string;
  public successMessage: string;
  public loading = true;

  constructor(private router: Router, private route: ActivatedRoute, public excelService: ExcelService, public feestdagenService: FeestdagenService) {
    this.route.data.subscribe(data => {
      this.busChauffeur = data['busChauffeur'];
    });
  }

  ngOnInit() {
    this.feestdagenService.getAllFeestdagen$().subscribe(
      val => {
        if (val) {
          this.feestdagen = val;
          this.loading = false;
        }
      },
      error => {
        this.errorMessage = error.error;
      }
    )
  }

  getHuidigeMaand() {
    return this.maand.format('MMMM');
  }

  dagenInHuidigeMaand(): any[] {
    var monthIndex = this.maand.month();
    var names = ['Zo', 'Ma', 'Di', 'Woe', 'Do', 'Vrij', 'Za'];
    var date = new Date(moment().year(), monthIndex, 1);
    var result = [];
    while (date.getMonth() == monthIndex) {
      if (this.feestdagen.find(t => t.dag.toDateString() == date.toDateString())) {
        result.push({
          jaar: date.getFullYear(),
          maand: this.maand.format("MMMM"),
          nummer: date.getDate(),
          naam: names[0]
        });
      }
      result.push({
        jaar: date.getFullYear(),
        maand: this.maand.format("MMMM"),
        nummer: date.getDate(),
        naam: names[date.getDay()]
      });
      date.setDate(date.getDate() + 1);

    }

    return result;
  }


  createRange(number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  printLoonlijst(): void {
    this.excelService.exportAsExcelFile(this.data, 'sample');
  }

}
