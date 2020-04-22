import { Component, OnInit, Input } from '@angular/core';
import { BusChauffeur } from '../modals/bus-chauffeur';
import { Router, ActivatedRoute } from '@angular/router';
import { ExcelService } from '../services/excel.service';
import * as moment from 'moment';
import { FeestdagenService } from '../services/feestdagen.service';
import { Feestdag } from '../modals/feestdag';
import { EffectieveDienstService } from '../services/effectieve-dienst.service';
import { EffectieveDienst } from '../modals/effectieve-dienst';

@Component({
  selector: 'app-toon-loonlijst',
  templateUrl: './toon-loonlijst.component.html',
  styleUrls: ['./toon-loonlijst.component.scss']
})
export class ToonLoonlijstComponent implements OnInit {

  /*//https://medium.com/@madhavmahesh/exporting-an-excel-file-in-angular-927756ac9857
  
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
  }];*/
  public busChauffeur: BusChauffeur;
  public maand: moment.Moment = moment();
  public feestdagen: Feestdag[] = [];
  public errorMessage: string;
  public successMessage: string;
  public loading = true;
  public effectieveDiensten: EffectieveDienst[];
  public data: any[];

  constructor(private router: Router, private route: ActivatedRoute, public excelService: ExcelService, public feestdagenService: FeestdagenService, public effectieveDienstenService: EffectieveDienstService) {
    this.route.data.subscribe(data => {
      this.busChauffeur = data['busChauffeur'];
      this.effectieveDiensten = data['effectieveDiensten'];
    });
  }

  ngOnInit() {
    this.feestdagenService.getAllFeestdagen$().subscribe(
      val => {
        if (val) {
          this.feestdagen = val;
          this.loadLijst();
          this.loading = false;
        }
      },
      error => {
        this.errorMessage = error.error;
      }
    )
  }

  veranderHuidigeMaand(met: number) {
    this.loading = true;
    if (met < 0) {
      this.maand.subtract(1, 'months');
    } else {
      this.maand.add(1, 'months');
    }
    this.effectieveDienstenService.getEffectieveDienstenByMonth$(this.maand.year(), this.maand.month(), this.busChauffeur.id).subscribe(
      val => {
        if (val) {
          this.effectieveDiensten = val;
          this.loading = false;
          this.loadLijst();
        }
      },
      error => {
        this.errorMessage = error.error;
        this.loading = false;
      }
    )
  }

  loadLijst() {
    var dagenInHuidigeMaand = this.dagenInHuidigeMaand();
    this.effectieveDiensten.forEach(dienst => {
      var start = moment(dienst.start)
      var einde = moment(dienst.einde)
      dagenInHuidigeMaand[dienst.start.getDate() - 1].rijtijd += einde.diff(start);
    })
    this.data = dagenInHuidigeMaand;
  }

  getHuidigeMaand() {
    return this.maand.format('MMMM').charAt(0).toUpperCase() + this.maand.format('MMMM').substring(1);
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
          maand: this.maand.format("MM"),
          nummer: date.getDate(),
          naam: names[0],
          rijtijd: 0,
        });
      } else {
        result.push({
          jaar: date.getFullYear(),
          maand: this.maand.format("MM"),
          nummer: date.getDate(),
          naam: names[date.getDay()],
          rijtijd: 0,
        });
      }

      date.setDate(date.getDate() + 1);

    }
    return result;
  }


  printLoonlijst(): void {
    // this.excelService.exportAsExcelFile(this.data, 'sample');
  }

  msToTime(duration) {
    var tijd = moment.duration(duration);
    var hours = tijd.hours().toString().length == 1 ? 0 + tijd.hours().toString() : tijd.hours().toString();
    var minutes = tijd.minutes().toString().length == 1 ? 0 + tijd.minutes().toString() : tijd.minutes().toString();
    return `${hours}:${minutes}`;
  }

}
