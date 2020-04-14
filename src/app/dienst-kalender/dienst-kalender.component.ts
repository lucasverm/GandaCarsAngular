import { ViewChild, Component, Input, ElementRef } from '@angular/core';
import { Dienst } from '../modals/dienst';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-dienst-kalender',
  templateUrl: './dienst-kalender.component.html',
  styleUrls: ['./dienst-kalender.component.scss']
})
export class dienstKalenderComponent {

  //@ViewChild('calendar', { static: true }) calendarComponent: FullCalendarComponent;

  @Input() diensten: Dienst[];

  calendarPlugins = [timeGridPlugin];
  constructor(private elementRef: ElementRef) {
  }

  public eventData = []

  ngOnInit() {
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
        dienst.stationnementen.forEach(s => {
          console.log(s.dag);
          console.log(dienst.startDag);
          this.eventData.push({
            title: "stationnment",
            color: "#ff0000",
            daysOfWeek: [s.dag.value == dienst.startDag.value ? dienst.startDag.value : dienst.eindDag.value],
            startTime: s.startUur.toTimeString(),
            endTime: s.eindUur.toTimeString(),
            url: `../dienst-wijzigen/${dienst.id}`
          })
        })

      } else {
        this.eventData.push({
          title: dienst.naam,
          daysOfWeek: [dienst.startDag.value],
          startTime: dienst.startUur.toTimeString(),
          endTime: dienst.eindUur.toTimeString(),
          url: `../dienst-wijzigen/${dienst.id}`
        })
        dienst.stationnementen.forEach(s => {
          this.eventData.push({
            title: "stationnment",
            color: "#ff0000",
            daysOfWeek: [dienst.startDag.value],
            startTime: s.startUur.toTimeString(),
            endTime: s.eindUur.toTimeString(),
            url: `../dienst-wijzigen/${dienst.id}`
          })
        })

      }
    })

  }


}