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
import { dienstKalenderComponent } from './dienst-kalender/dienst-kalender.component';
import { DienstOverzichtComponent } from './dienst-overzicht/dienst-overzicht.component';
import { DienstInfoComponent } from './dienst-info/dienst-info.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DienstToevoegenComponent } from './dienst-toevoegen/dienst-toevoegen.component';
import { registerLocaleData } from '@angular/common';
import localeBe from '@angular/common/locales/nl-BE';
import { DienstWijzigenComponent } from './dienst-wijzigen/dienst-wijzigen.component';
import { BusChauffeurWijzigenComponent } from './bus-chauffeur-wijzigen/bus-chauffeur-wijzigen.component';

// the second parameter 'fr-FR' is optional
registerLocaleData(localeBe);
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
    DienstInfoComponent,
    DienstToevoegenComponent,
    DienstWijzigenComponent,
    BusChauffeurWijzigenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
