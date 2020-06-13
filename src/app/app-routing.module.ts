import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BusChauffeurToevoegenComponent } from "./bus-chauffeur-toevoegen/bus-chauffeur-toevoegen.component";
import { BusChauffeurOverzichtComponent } from "./bus-chauffeur-overzicht/bus-chauffeur-overzicht.component";
import { BuschauffeurInfoComponent } from "./buschauffeur-info/buschauffeur-info.component";
import { BusChauffeurResolver } from "./resolvers/bus-chauffeur.resolver";
import { dienstKalenderComponent } from "./dienst-kalender/dienst-kalender.component";
import { DienstOverzichtComponent } from "./dienst-overzicht/dienst-overzicht.component";
import { DienstInfoComponent } from "./dienst-info/dienst-info.component";
import { DienstResolver } from "./resolvers/dienst.resolver";
import { DienstToevoegenComponent } from "./dienst-toevoegen/dienst-toevoegen.component";
import { DienstWijzigenComponent } from "./dienst-wijzigen/dienst-wijzigen.component";
import { BusChauffeurWijzigenComponent } from "./bus-chauffeur-wijzigen/bus-chauffeur-wijzigen.component";
import { ToonLoonlijstComponent } from "./toon-loonlijst/toon-loonlijst.component";
import { FeestdagenAanpassenComponent } from "./feestdagen-aanpassen/feestdagen-aanpassen.component";
import { EffectieveWeekWijzigenComponent } from "./effectieve-week-wijzigen/effectieve-week-wijzigen.component";
import { EffectieveDienstenResolver } from "./resolvers/effectieve-diensten.resolver";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { EffectieveDienstenNullOmzettenResolver } from "./resolvers/effectieve-diensten-null-omzetten.resolver";
import { EffectieveDienstenByMonthResolver } from "./resolvers/effectieve-diensten-by-month.resolver";
import { InstellingenAanpassenComponent } from "./instellingen-aanpassen/instellingen-aanpassen.component";
import { InstellingenResolver } from "./resolvers/instellingen.resolver";

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
    resolve: { effectieveDiensten: EffectieveDienstenNullOmzettenResolver },
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
