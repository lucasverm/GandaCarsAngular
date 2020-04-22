import { ViewChild, Component, Input, ElementRef } from '@angular/core';
import { Dienst } from '../modals/dienst';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { FeestdagenService } from '../services/feestdagen.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { BusChauffeur } from '../modals/bus-chauffeur';
import { BehaviorSubject } from 'rxjs';
import { EffectieveDienstService } from '../services/effectieve-dienst.service';
import { HttpErrorResponse } from '@angular/common/http';
import { element } from 'protractor';

@Component({
  selector: 'app-dienst-kalender',
  templateUrl: './dienst-kalender.component.html',
  styleUrls: ['./dienst-kalender.component.scss']
})
export class dienstKalenderComponent {

  @ViewChild('calendar', { static: true }) calendarComponent: FullCalendarComponent;
  public api;
  @Input() busChauffeur: BusChauffeur;
  public errorMessage: String;
  calendarPlugins = [timeGridPlugin, bootstrapPlugin];
  getCustomButtons = {
    vorige: {
      bootstrapFontAwesome: "fa-arrow-left",
      click: this.veranderWeekPrev.bind(this)
    },
    volgende: {
      bootstrapFontAwesome: "fa-arrow-right",
      click: this.veranderWeekNext.bind(this)
    },
    vandaag: {
      text: "Vandaag",
      click: this.veranderWeekVandaag.bind(this)
    },
    bewerkWeek: {
      text: "Bewerk deze week",
      //bootstrapFontAwesome: "fa-arrow-right",
      click: this.bewerkWeek.bind(this)
    }
  }

  public eventData = []
  public recurringEvents = null;
  public feestdagen = null;
  public apiCall;
  constructor(private router: Router, private feestdagenService: FeestdagenService, private effectieveDienstService: EffectieveDienstService) { }

  loadRecurrentEvents() {
    if (this.recurringEvents == null) {
      this.recurringEvents = [];
      this.busChauffeur.diensten.forEach(dienst => {
        if (dienst.startDag != dienst.eindDag) {
          this.recurringEvents.push({
            title: dienst.naam,
            daysOfWeek: [dienst.startDag.value],
            startTime: dienst.startUur.toTimeString(),
            endTime: "24:00",
            url: `../dienst-wijzigen/${dienst.id}`
          },
            {
              title: dienst.naam,
              daysOfWeek: [dienst.eindDag.value],
              startTime: "0:00",
              endTime: dienst.eindUur.toTimeString(),
              url: `../dienst-wijzigen/${dienst.id}`
            }
          )
        } else {
          this.recurringEvents.push({
            title: dienst.naam,
            daysOfWeek: [dienst.startDag.value],
            startTime: dienst.startUur.toTimeString(),
            endTime: dienst.eindUur.toTimeString(),
            url: `../dienst-wijzigen/${dienst.id}`
          })
        }
      })
    }
    this.recurringEvents.forEach(t => this.eventData.push(t));
  }

  loadFeestdagen() {
    if (this.feestdagen == null) {
      this.feestdagen = [];
      this.feestdagenService.getAllFeestdagen$().subscribe(
        val => {
          if (val) {
            val.forEach(fd => {
              var event = {
                title: fd.naam,
                date: this.getDateForInput(fd.dag),
                color: "#FFA500",
                url: "/feestdagen-aanpassen"
              }
              this.feestdagen.push(event);
              this.eventData.push(event);
            });
            var verjaardag = new Date();
            verjaardag.setDate(this.busChauffeur.geboorteDatum.getDate());
            verjaardag.setMonth(this.busChauffeur.geboorteDatum.getMonth());
            var verjaardagsEvent = {
              title: `Verjaardag ${this.busChauffeur.voornaam} ${this.busChauffeur.achternaam}`,
              date: this.getDateForInput(verjaardag),
              color: "#32CD32"
            }
            this.feestdagen.push(verjaardagsEvent);
            this.eventData.push(verjaardagsEvent);
          }
        }
      )
    } else {
      this.feestdagen.forEach(t => this.eventData.push(t));
    }
  }

  loadCalenderVoorWeek() {
    this.effectieveDienstService.getEffectieveDiensten$(this.getCurrentYear(), this.getCurrentWeekNumber().toString(), this.busChauffeur.id).subscribe(
      val => {
        if (val) {
          this.eventData = [];
          this.loadFeestdagen();
          if (val.length == 0) {
            this.loadRecurrentEvents();
          } else {
            val.forEach(ed => {
              this.eventData.push({
                title: ed.naam,
                start: this.getDateForInputMetTijd(ed.start),
                end: this.getDateForInputMetTijd(ed.einde),
                color: "#FF0000"
              })
            })
          }
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      }
    );
  }

  public veranderWeekNext() {
    this.api.next();
    this.api.today
    this.loadCalenderVoorWeek();
  }

  public veranderWeekVandaag() {
    this.api.today();
    this.loadCalenderVoorWeek();
  }

  public veranderWeekPrev() {
    this.api.prev();
    this.loadCalenderVoorWeek();
  }

  getHeader() {
    return {
      left: 'bewerkWeek',
      center: 'title',
      right: 'vandaag, vorige,volgende'
      //right: 'today prev,next'
    }
  }

  ngAfterViewInit() {
    this.api = this.calendarComponent.getApi();
    this.loadCalenderVoorWeek();
  }

  bewerkWeek() {
    this.router.navigate([`../../effectieve-week-wijzigen/${this.getCurrentYear()}/${this.getCurrentWeekNumber()}/${this.busChauffeur.id}`]);
  }

  getCurrentDate() {
    return this.api.getDate();
  }

  getCurrentYear() {
    return this.getCurrentDate().getFullYear();
  }

  getCurrentWeekNumber() {
    return moment(this.getCurrentDate()).week();
  }

  getDateForInput(date: Date): string {
    var uitvoer: string = "";
    uitvoer += date.getFullYear() + "-";
    if (date.getMonth().toString().length == 1) {
      uitvoer += "0" + (date.getMonth() + 1) + "-";
    } else {
      uitvoer += (date.getMonth() + 1) + "-";
    }
    if (date.getDate().toString().length == 1) {
      uitvoer += "0" + date.getDate();
    } else {
      uitvoer += date.getDate();
    }
    return uitvoer;
  }

  getDateForInputMetTijd(date: Date): string {
    var uitvoer: string = "";
    uitvoer += date.getFullYear() + "-";
    if (date.getMonth().toString().length == 1) {
      uitvoer += "0" + (date.getMonth() + 1) + "-";
    } else {
      uitvoer += (date.getMonth() + 1) + "-";
    }
    if (date.getDate().toString().length == 1) {
      uitvoer += "0" + date.getDate();
    } else {
      uitvoer += date.getDate();
    }
    uitvoer += 'T' + date.toTimeString().slice(0, 5);
    return uitvoer;
  }


}