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

@Component({
  selector: 'app-dienst-kalender',
  templateUrl: './dienst-kalender.component.html',
  styleUrls: ['./dienst-kalender.component.scss']
})
export class dienstKalenderComponent {

  @ViewChild('calendar', { static: true }) calendarComponent: FullCalendarComponent;
  public api;
  @Input() busChauffeur: BusChauffeur;
  calendarPlugins = [timeGridPlugin, bootstrapPlugin];
  getCustomButtons = {
    vorige: {
      //text: "ttt",
      bootstrapFontAwesome: "fa-arrow-left",
      click: this.veranderWeekPrev.bind(this)
    },
    volgende: {
      //text: "zzz",
      bootstrapFontAwesome: "fa-arrow-right",
      click: this.veranderWeekNext.bind(this)
    }
  }


  constructor(private router: Router, private feestdagenService: FeestdagenService) { }

  public eventData = []

  ngOnInit() {
    //feestdagen in kalender
    this.feestdagenService.getAllFeestdagen$().subscribe(
      val => {
        if (val) {
          val.forEach(fd => {
            this.eventData.push({
              title: fd.naam,
              date: this.getDateForInput(fd.dag),
              color: "#FFA500"
            })
          })
        }
      }
    )

    this.busChauffeur.diensten.forEach(dienst => {
      if (dienst.startDag != dienst.eindDag) {
        this.eventData.push({
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
        this.eventData.push({
          title: dienst.naam,
          daysOfWeek: [dienst.startDag.value],
          startTime: dienst.startUur.toTimeString(),
          endTime: dienst.eindUur.toTimeString(),
          url: `../dienst-wijzigen/${dienst.id}`
        })
      }
    })

  }

  public veranderWeekNext() {
    this.api.next();
  }

  public veranderWeekPrev() {
    this.api.prev();
  }

  getHeader() {
    return {
      left: 'title',
      center: '',
      right: 'vorige,volgende'
      //right: 'today prev,next'
    }
  }

  ngAfterViewInit() {
    this.api = this.calendarComponent.getApi();
    console.log(this.api);

  }

  bewerkWeek() {
    this.router.navigate([`../../effectieve-week-wijzigen/${this.getCurrentYear()}/${this.getCurrentWeekNumber()}/${this.busChauffeur.id}`]);
  }

  getCurrentDate() {
    return this.api.getDate();
  }

  getCurrentYear() {
    return this.api.getFullYear();
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


}