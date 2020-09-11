import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as moment from "moment";
import * as XLSX from "xlsx";
import { BusChauffeur } from "../modals/bus-chauffeur";
import { EffectieveDienst } from "../modals/effectieve-dienst";
import { Feestdag } from "../modals/feestdag";
import { Instellingen } from "../modals/instellingen";
import { EffectieveDienstService } from "../services/effectieve-dienst.service";
import { FeestdagenService } from "../services/feestdagen.service";

@Component({
  selector: "app-toon-loonlijst",
  templateUrl: "./toon-loonlijst.component.html",
  styleUrls: ["./toon-loonlijst.component.scss"],
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
  public instellingen: Instellingen;
  public dataTotaal: any[];

  constructor(private router: Router, private route: ActivatedRoute, public feestdagenService: FeestdagenService, public effectieveDienstenService: EffectieveDienstService) {
    this.route.data.subscribe((data) => {
      this.busChauffeur = data["busChauffeur"];
      this.effectieveDiensten = data["effectieveDiensten"];
      this.instellingen = data["instellingen"];
    });
  }

  ngOnInit() {
    this.feestdagenService.getAllFeestdagen$().subscribe(
      (val) => {
        if (val) {
          this.feestdagen = val;
          this.loadLijst();
          this.loading = false;
        }
      },
      (error) => {
        this.errorMessage = error.error;
      }
    );
  }

  veranderHuidigeMaand(met: number) {
    this.loading = true;
    if (met < 0) {
      this.maand.subtract(1, "months");
    } else {
      this.maand.add(1, "months");
    }
    this.effectieveDienstenService.getEffectieveDienstenByMonth$(this.maand.year(), this.maand.month(), this.busChauffeur.id).subscribe(
      (val) => {
        if (val) {
          this.effectieveDiensten = val;
          this.loading = false;
          this.loadLijst();
        }
      },
      (error) => {
        this.errorMessage = error.error;
        this.loading = false;
      }
    );
  }

  loadLijst() {
    var dagenInHuidigeMaand = this.dagenInHuidigeMaand();
    this.effectieveDiensten.forEach((dienst) => {
      if (dienst.gerelateerdeDienst === undefined || dienst.start < new Date(dienst.gerelateerdeDienst.start)) {
        var start = moment(dienst.start);
        var einde = moment(dienst.gerelateerdeDienst !== undefined ? new Date(dienst.gerelateerdeDienst.einde) : dienst.einde);
        var aantalMinutenStationnement = dienst.totaalAantalMinutenStationnement;
        let statAT = aantalMinutenStationnement > 15 ? 15 : aantalMinutenStationnement;
        var totaleTijdOnderbrekingen = 0;
        dienst.onderbrekingen.forEach((onderbreking) => {
          totaleTijdOnderbrekingen += moment(onderbreking.effectiefEinde).diff(moment(onderbreking.effectieveStart));
        });
        let statRest = aantalMinutenStationnement - 15 > 30 ? 30 : Math.max(0, aantalMinutenStationnement - 15);
        var totaalAT = einde.diff(start) - totaleTijdOnderbrekingen / 60000 + statAT + this.instellingen.aantalMinutenAdministratieveTijdVoorDienst + dienst.andereMinuten;
        var nacht = moment(dienst.start).diff(moment(new Date(dienst.start.getFullYear(), dienst.start.getMonth(), dienst.start.getDate(), 0, 0)));
        var zat = this.geefUrenOp(6, dienst, totaleTijdOnderbrekingen);
        var zon = this.geefUrenOp(0, dienst, totaleTijdOnderbrekingen);
        dagenInHuidigeMaand[dienst.start.getDate() - 1].dienst.push(dienst.naam);
        dagenInHuidigeMaand[dienst.start.getDate() - 1].rijtijd += einde.diff(start) - totaleTijdOnderbrekingen;
        dagenInHuidigeMaand[dienst.start.getDate() - 1].statAT = statAT;
        dagenInHuidigeMaand[dienst.start.getDate() - 1].statRest = statRest;
        dagenInHuidigeMaand[dienst.start.getDate() - 1].stat50 = Math.max(0, aantalMinutenStationnement - 45);
        dagenInHuidigeMaand[dienst.start.getDate() - 1].admin = this.instellingen.aantalMinutenAdministratieveTijdVoorDienst;
        dagenInHuidigeMaand[dienst.start.getDate() - 1].ander = dienst.andereMinuten;
        dagenInHuidigeMaand[dienst.start.getDate() - 1].ampl = Math.max(0, dagenInHuidigeMaand[dienst.start.getDate() - 1].rijtijd - 43200000);
        dagenInHuidigeMaand[dienst.start.getDate() - 1].apdp = Math.max(0, 240 - totaalAT);
        dagenInHuidigeMaand[dienst.start.getDate() - 1].totaalAT += totaalAT;
        dagenInHuidigeMaand[dienst.start.getDate() - 1].nacht = totaalAT;
        dagenInHuidigeMaand[dienst.start.getDate() - 1].zat += zat;
        dagenInHuidigeMaand[dienst.start.getDate() - 1].zon += zon;
        dagenInHuidigeMaand[dienst.start.getDate() - 1].ond1 = dienst.onderbrekingen.length >= 1 ? 1 : 0;
        dagenInHuidigeMaand[dienst.start.getDate() - 1].ond2 = dienst.onderbrekingen.length >= 2 ? 1 : 0;
        dagenInHuidigeMaand[dienst.start.getDate() - 1].ond3 = dienst.onderbrekingen.length >= 3 ? 1 : 0;
        dagenInHuidigeMaand[dienst.start.getDate() - 1].onvPres = 0;
        dagenInHuidigeMaand[dienst.start.getDate() - 1].overuren = Math.max(0, totaalAT - 600);
      }
    });
    this.data = dagenInHuidigeMaand;
    this.totaal();
  }

  totaal(): any {
    const result = {};
    this.data.forEach((basket) => {
      for (let [key, value] of Object.entries(basket)) {
        if (result[key]) {
          result[key] += value;
        } else {
          result[key] = value;
        }
      }
    });
    return result;
  }

  geefUrenOp(dagNummer: number, dienst: EffectieveDienst, urenOnderbreking: number) {
    if (dienst.gerelateerdeDienst === undefined) {
      var start = moment(dienst.start);
      var einde = moment(dienst.einde);
      return dienst.start.getDay() === dagNummer ? einde.diff(start) - urenOnderbreking : 0;
    } else {
      if (dienst.start.getDay() === dagNummer) {
        var start = moment(dienst.start);
        var einde = moment(dienst.einde);
        return einde.diff(start) - urenOnderbreking;
      } else if (new Date(dienst.gerelateerdeDienst.start).getDay() === dagNummer) {
        var start = moment(new Date(dienst.gerelateerdeDienst.start));
        var einde = moment(new Date(dienst.gerelateerdeDienst.einde));
        return einde.diff(start) - urenOnderbreking;
      } else {
        return 0;
      }
    }
  }

  getHuidigeMaand() {
    return this.maand.format("MMMM").charAt(0).toUpperCase() + this.maand.format("MMMM").substring(1);
  }

  dagenInHuidigeMaand(): any[] {
    var monthIndex = this.maand.month();
    var names = ["Zo", "Ma", "Di", "Woe", "Do", "Vrij", "Za"];
    var date = new Date(moment().year(), monthIndex, 1);
    var result = [];
    while (date.getMonth() === monthIndex) {
      if (this.feestdagen.find((t) => t.dag.toDateString() === date.toDateString())) {
        result.push({
          jaar: date.getFullYear(),
          maand: this.maand.format("MM"),
          nummer: date.getDate(),
          naam: names[0],
          feestdag: true,
          dienst: [],
          rijtijd: 0,
          statAT: 0,
          statRest: 0,
          stat50: 0,
          admin: 0,
          ander: 0,
          ampl: 0,
          apdp: 0,
          totaalAT: 0,
          nacht: 0,
          zat: 0,
          zon: 0,
          ond1: 0,
          ond2: 0,
          ond3: 0,
          onvPres: 0,
          overuren: 0,
        });
      } else {
        result.push({
          jaar: date.getFullYear(),
          maand: this.maand.format("MM"),
          nummer: date.getDate(),
          naam: names[date.getDay()],
          feestdag: false,
          dienst: [],
          rijtijd: 0,
          statAT: 0,
          statRest: 0,
          stat50: 0,
          admin: 0,
          ander: 0,
          ampl: 0,
          apdp: 0,
          totaalAT: 0,
          nacht: 0,
          zat: 0,
          zon: 0,
          ond1: 0,
          ond2: 0,
          ond3: 0,
          onvPres: 0,
          overuren: 0,
        });
      }

      date.setDate(date.getDate() + 1);
    }
    return result;
  }

  printLoonlijst() {
    //this.excelService.exportAsExcelFile(this.data, 'sample');
    let element = document.getElementById("afdrukken");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${this.busChauffeur.voornaam}_${this.busChauffeur.achternaam}_${this.getHuidigeMaand()}.xlsx`);
  }

  msToTime(duration) {
    var tijd = moment.duration(duration);
    var hours = tijd.hours().toString().length === 1 ? 0 + tijd.hours().toString() : tijd.hours().toString();
    var minutes = tijd.minutes().toString().length === 1 ? 0 + tijd.minutes().toString() : tijd.minutes().toString();
    return `${hours}:${minutes}`;
  }

  minutesToTime(value: number): string {
    var hours = Math.floor((value * 60) / 3600);
    var minutes = value % 60;
    var hoursUitvoer = hours.toString().length === 1 ? 0 + hours.toString() : hours.toString();
    var minutesUitvoer = minutes.toString().length === 1 ? 0 + minutes.toString() : minutes.toString();
    return hoursUitvoer + ":" + minutesUitvoer;
  }
}
