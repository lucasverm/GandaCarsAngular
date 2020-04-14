import { Component, OnInit, Input } from '@angular/core';
import { BusChauffeur } from '../modals/bus-chauffeur';
import { Router, ActivatedRoute } from '@angular/router';
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-toon-loonlijst',
  templateUrl: './toon-loonlijst.component.html',
  styleUrls: ['./toon-loonlijst.component.scss']
})
export class ToonLoonlijstComponent implements OnInit {

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


  constructor(private router: Router, private route: ActivatedRoute, public excelService: ExcelService) {
    this.route.data.subscribe(data => {
      this.busChauffeur = data['busChauffeur'];
    });
  }

  ngOnInit() {
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
