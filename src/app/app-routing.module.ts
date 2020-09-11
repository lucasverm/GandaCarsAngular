import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BusChauffeurOverzichtComponent } from "./bus-chauffeur-overzicht/bus-chauffeur-overzicht.component";
import { BusChauffeurToevoegenComponent } from "./bus-chauffeur-toevoegen/bus-chauffeur-toevoegen.component";
import { BusChauffeurWijzigenComponent } from "./bus-chauffeur-wijzigen/bus-chauffeur-wijzigen.component";
import { BuschauffeurInfoComponent } from "./buschauffeur-info/buschauffeur-info.component";
import { DienstOverzichtComponent } from "./dienst-overzicht/dienst-overzicht.component";
import { DienstToevoegenComponent } from "./dienst-toevoegen/dienst-toevoegen.component";
import { DienstWijzigenComponent } from "./dienst-wijzigen/dienst-wijzigen.component";
import { EffectieveWeekWijzigenComponent } from "./effectieve-week-wijzigen/effectieve-week-wijzigen.component";
import { FeestdagenAanpassenComponent } from "./feestdagen-aanpassen/feestdagen-aanpassen.component";
import { InstellingenAanpassenComponent } from "./instellingen-aanpassen/instellingen-aanpassen.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BusChauffeurResolver } from "./resolvers/bus-chauffeur.resolver";
import { DienstResolver } from "./resolvers/dienst.resolver";
import { EffectieveDienstenByMonthResolver } from "./resolvers/effectieve-diensten-by-month.resolver";
import { EffectieveDienstenUndefinedOmzettenResolver } from "./resolvers/effectieve-diensten-undefined-omzetten.resolver";
import { InstellingenResolver } from "./resolvers/instellingen.resolver";
import { ToonLoonlijstComponent } from "./toon-loonlijst/toon-loonlijst.component";

const routes: Routes = [
  {
    path: "dienst-overzicht",
    component: DienstOverzichtComponent,
  },
  {
    path: "dienst-toevoegen",
    component: DienstToevoegenComponent,
  },
  {
    path: "dienst-wijzigen/:id",
    component: DienstWijzigenComponent,
    resolve: { dienst: DienstResolver },
  },
  {
    path: "buschauffeur-wijzigen/:id",
    component: BusChauffeurWijzigenComponent,
    resolve: { busChauffeur: BusChauffeurResolver },
  },
  {
    path: "buschauffeur-toevoegen",
    component: BusChauffeurToevoegenComponent,
  },
  {
    path: "buschauffeur-overzicht",
    component: BusChauffeurOverzichtComponent,
  },
  {
    path: "buschauffeur-info/:id",
    component: BuschauffeurInfoComponent,
    resolve: { busChauffeur: BusChauffeurResolver },
  },
  {
    path: "toon-loonlijst/:id",
    component: ToonLoonlijstComponent,
    resolve: {
      busChauffeur: BusChauffeurResolver,
      effectieveDiensten: EffectieveDienstenByMonthResolver,
      instellingen: InstellingenResolver,
    },
  },
  {
    path: "feestdagen-aanpassen",
    component: FeestdagenAanpassenComponent,
  },
  {
    path: "instellingen-aanpassen",
    component: InstellingenAanpassenComponent,
    resolve: { instellingen: InstellingenResolver },
  },
  {
    path: "effectieve-week-wijzigen/:jaar/:week/:buschauffeurid",
    component: EffectieveWeekWijzigenComponent,
    resolve: { effectieveDiensten: EffectieveDienstenUndefinedOmzettenResolver },
  },
  {
    path: "",
    redirectTo: "buschauffeur-overzicht",
    pathMatch: "full",
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
