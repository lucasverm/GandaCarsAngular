import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarView,
  DAYS_OF_WEEK,
  CalendarMonthViewBeforeRenderEvent,
  CalendarWeekViewBeforeRenderEvent,
  CalendarDayViewBeforeRenderEvent,
} from 'angular-calendar';
import { addDays, addHours, startOfDay, } from 'date-fns';
import { Dienst } from '../modals/dienst';
import RRule from 'rrule';
import { ViewPeriod } from 'calendar-utils';
import moment from 'moment-timezone';

interface RecurringEvent {
  title: string;
  color: any;
  rrule?: {
    freq: any;
    bymonth?: number;
    bymonthday?: number;
    byweekday?: any;
  };
}

@Component({
  selector: 'app-dienst-kalender',
  templateUrl: './dienst-kalender.component.html',
  styleUrls: ['./dienst-kalender.component.scss']
})
export class dienstKalenderComponent {
  viewDate: Date = new Date();
  @Input() diensten: Dienst[];

  calendarEvents: CalendarEvent[] = [];
  locale: string = 'nl-BE';
  viewPeriod: ViewPeriod;
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  constructor(private cdr: ChangeDetectorRef) {}

  getCalenderEvents() {
    /*return [
      {
        start: addHours(startOfDay(new Date()), 5),
        end: addHours(startOfDay(new Date()), 17),
        title: 'Event 1',
        //color: colors.red,
        allDay: true,
      },
      {
        start: addHours(startOfDay(addDays(new Date(), 1)), 2),
        end: addHours(startOfDay(addDays(new Date(), 1)), 18),
        title: 'Event 2',
        //color: colors.blue,
        allDay: true,
      },
      {
        start: addHours(startOfDay(new Date()), 8),
        title: 'Event 3',
        //color: colors.blue,
        allDay: true,
      },
    ];*/

    let uitvoer: RecurringEvent[] = [];
    this.diensten.forEach(dienst => {
      /*let vandaag = new Date();
      let startDag = new Date();
      let eindDag = new Date();
      //console.log(dienst);
      if (vandaag.getDay() > dienst.dag.value) {
        startDag.setDate(startDag.getDate() - (startDag.getDay() - dienst.dag.value))
        eindDag.setDate(eindDag.getDate() - (eindDag.getDay() - dienst.dag.value))
      } else if (vandaag.getDay() < dienst.dag.value) {
        startDag.setDate(startDag.getDate() + (dienst.dag.value - startDag.getDay()))
        eindDag.setDate(eindDag.getDate() + (dienst.dag.value - eindDag.getDay()))
      }
      startDag.setHours(dienst.startUur.getHours());
      startDag.setMinutes(dienst.startUur.getMinutes());
      eindDag.setHours(dienst.eindUur.getHours());
      eindDag.setMinutes(dienst.eindUur.getMinutes());*/
      uitvoer.push({
        //start: addHours(startOfDay(dagVanEvent), dienst.startUur.getHours()),
        //start: startDag,
        //end: addHours(startOfDay(dagVanEvent), dienst.eindUur.getHours()),
        //end: eindDag,
        title: dienst.naam,
        color: "red",
        //color: colors.blue,
        rrule: {
          freq: RRule.WEEKLY,
          byweekday: [RRule.MO],
        },
      })
    })

    return uitvoer;
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }
  updateCalendarEvents(
    viewRender:
      | CalendarMonthViewBeforeRenderEvent
      | CalendarWeekViewBeforeRenderEvent
      | CalendarDayViewBeforeRenderEvent
  ): void {
    if (
      !this.viewPeriod ||
      !moment(this.viewPeriod.start).isSame(viewRender.period.start) ||
      !moment(this.viewPeriod.end).isSame(viewRender.period.end)
    ) {
      this.viewPeriod = viewRender.period;
      this.calendarEvents = [];

      this.getCalenderEvents().forEach((event) => {
        const rule: RRule = new RRule({
          ...event.rrule,
          dtstart: moment(viewRender.period.start).startOf('day').toDate(),
          until: moment(viewRender.period.end).endOf('day').toDate(),
        });
        const { title, color } = event;

        rule.all().forEach((date) => {
          this.calendarEvents.push({
            title,
            color,
            start: moment(date).toDate(),
          });
        });
      });
      this.cdr.detectChanges();
    }
  }
}
