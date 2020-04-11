import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusChauffeurToevoegenComponent } from './bus-chauffeur-toevoegen/bus-chauffeur-toevoegen.component';
import { BusChauffeurOverzichtComponent } from './bus-chauffeur-overzicht/bus-chauffeur-overzicht.component';
import { BuschauffeurInfoComponent } from './buschauffeur-info/buschauffeur-info.component';
import { BusChauffeurResolver } from './resolvers/bus-chauffeur.resolver';
import { dienstKalenderComponent } from './dienst-kalender/dienst-kalender.component';
import { DienstOverzichtComponent } from './dienst-overzicht/dienst-overzicht.component';
import { DienstInfoComponent } from './dienst-info/dienst-info.component';
import { DienstResolver } from './resolvers/dienst.resolver';
import { DienstToevoegenComponent } from './dienst-toevoegen/dienst-toevoegen.component';


const routes: Routes = [
  {
    path: 'dienst-overzicht',
    component: DienstOverzichtComponent,
  },
  {
    path: 'dienst-toevoegen',
    component: DienstToevoegenComponent,
  },
  {
    path: "dienst-info/:id",
    component: DienstInfoComponent,
    resolve: { dienst: DienstResolver },
  },
  {
    path: 'buschauffeur-toevoegen',
    component: BusChauffeurToevoegenComponent,
  },
  {
    path: 'buschauffeur-overzicht',
    component: BusChauffeurOverzichtComponent,
  },
  {
    path: "buschauffeur-info/:id",
    component: BuschauffeurInfoComponent,
    resolve: { busChauffeur: BusChauffeurResolver },
  },
  /*
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: "full"
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
