import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusChauffeurToevoegenComponent } from './bus-chauffeur-toevoegen/bus-chauffeur-toevoegen.component';


const routes: Routes = [
  {
    path: 'buschaufeurtoevoegen',
    component: BusChauffeurToevoegenComponent,
  }
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
