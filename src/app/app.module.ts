import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BusChauffeurToevoegenComponent } from './bus-chauffeur-toevoegen/bus-chauffeur-toevoegen.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BusChauffeurOverzichtComponent } from './bus-chauffeur-overzicht/bus-chauffeur-overzicht.component';
import { BuschauffeurInfoComponent } from './buschauffeur-info/buschauffeur-info.component';
import { BusChauffeurDetailsComponent } from './bus-chauffeur-details/bus-chauffeur-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { dienstKalenderComponent } from './dienst-kalender/dienst-kalender.component';

import {
  CalendarModule, DateAdapter, CalendarDateFormatter,
  CalendarMomentDateFormatter,
  MOMENT,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeBe from '@angular/common/locales/nl-BE';
import localeBeExtra from '@angular/common/locales/extra/nl-BE';
import { DienstOverzichtComponent } from './dienst-overzicht/dienst-overzicht.component';
import { DienstInfoComponent } from './dienst-info/dienst-info.component';

import moment from 'moment-timezone';
registerLocaleData(localeBe, 'nl-BE', localeBeExtra);

@NgModule({
  declarations: [
    AppComponent,
    BusChauffeurToevoegenComponent,
    SidebarComponent,
    BusChauffeurOverzichtComponent,
    BuschauffeurInfoComponent,
    BusChauffeurDetailsComponent,
    dienstKalenderComponent,
    DienstOverzichtComponent,
    DienstInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,

    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    },
      {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: CalendarMomentDateFormatter,
        },
      }),
    BrowserAnimationsModule

  ],
  providers: [{
    provide: MOMENT,
    useValue: moment,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
