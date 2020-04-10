import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusChauffeurToevoegenComponent } from './bus-chauffeur-toevoegen/bus-chauffeur-toevoegen.component';
import { BusChauffeurOverzichtComponent } from './bus-chauffeur-overzicht/bus-chauffeur-overzicht.component';
import { BuschauffeurInfoComponent } from './buschauffeur-info/buschauffeur-info.component';
import { BusChauffeurResolver } from './resolvers/bus-chauffeur.resolver';


const routes: Routes = [
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
