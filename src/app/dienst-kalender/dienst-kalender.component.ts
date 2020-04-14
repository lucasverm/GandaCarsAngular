import { ViewChild, Component, Input, ElementRef } from '@angular/core';
import { Dienst } from '../modals/dienst';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FeestdagenService } from '../services/feestdagen.service';

@Component({
  selector: 'app-dienst-kalender',
  templateUrl: './dienst-kalender.component.html',
  styleUrls: ['./dienst-kalender.component.scss']
})
export class dienstKalenderComponent {

  //@ViewChild('calendar', { static: true }) calendarComponent: FullCalendarComponent;

  @Input() diensten: Dienst[];

  calendarPlugins = [timeGridPlugin];
  constructor(private elementRef: ElementRef, private feestdagenService: FeestdagenService) { }

  public eventData = []

  ngOnInit() {
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

    this.diensten.forEach(dienst => {
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