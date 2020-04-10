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

@NgModule({
  declarations: [
    AppComponent,
    BusChauffeurToevoegenComponent,
    SidebarComponent,
    BusChauffeurOverzichtComponent,
    BuschauffeurInfoComponent,
    BusChauffeurDetailsComponent,
    dienstKalenderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
