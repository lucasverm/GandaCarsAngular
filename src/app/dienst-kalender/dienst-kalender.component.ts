import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import RRule from 'rrule';
import moment from 'moment-timezone';
import {
  CalendarDayViewBeforeRenderEvent,
  CalendarEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarView,
  DAYS_OF_WEEK,
  CalendarWeekViewBeforeRenderEvent,
} from 'angular-calendar';
import { ViewPeriod } from 'calendar-utils';
import { Dienst } from '../modals/dienst';

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

moment.tz.setDefault('Utc');

@Component({
  selector: 'app-dienst-kalender',
  templateUrl: './dienst-kalender.component.html',
  styleUrls: ['./dienst-kalender.component.scss']
})
export class dienstKalenderComponent {
  @Input() diensten: Dienst[];
  view: CalendarView = CalendarView.Week;
  locale: string = 'nl-BE';
  viewDate = moment().toDate();
  calendarEvents: CalendarEvent[] = [];
  viewPeriod: ViewPeriod;
  constructor(private cdr: ChangeDetectorRef) { }

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
      console.log(viewRender.period);
      
      this.calendarEvents = [];
      let eventen = [
        {
          title: 'Recurs weekly on mondays',
          color: "red",

          rrule: {
            freq: RRule.WEEKLY,
            byweekday: [RRule.MO],
          },
        },
      ];
      eventen.forEach((event) => {
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

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }
}