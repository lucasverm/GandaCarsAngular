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
          endTime: "24:00"
        },
          {
            title: dienst.naam,
            daysOfWeek: [dienst.eindDag.value],
            startTime: "0:00",
            endTime: dienst.eindUur.toTimeString()
          }
        )
      } else {
        this.eventData.push({
          title: dienst.naam,
          daysOfWeek: [dienst.startDag.value],
          startTime: dienst.startUur.toTimeString(),
          endTime: dienst.eindUur.toTimeString()
        })
      }
    })

  }


}