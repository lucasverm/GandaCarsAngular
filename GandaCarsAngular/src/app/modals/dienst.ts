import { BusChauffeur } from "./bus-chauffeur";
import { DagenVanDeWeek } from "./dagen-van-de-week.enum";
import { Onderbreking } from "./onderbreking";

export class Dienst {
  id: string;
  naam: string;
  startUur: Date;
  eindUur: Date;
  startDag: any;
  eindDag: any;
  busChauffeur: BusChauffeur;
  totaalAantalMinutenStationnement: number;
  onderbrekingen: Onderbreking[];

  static fromJSON(json: any): Dienst {
    var item = new Dienst();
    item.id = json.id;
    item.naam = json.naam;
    item.startUur = new Date(json.startUur);
    item.eindUur = new Date(json.eindUur);
    item.startDag = DagenVanDeWeek.properties[json.startDag];
    item.eindDag = DagenVanDeWeek.properties[json.eindDag];
    item.busChauffeur = json.busChauffeur;
    item.totaalAantalMinutenStationnement = json.totaalAantalMinutenStationnement;
    item.onderbrekingen = json.onderbrekingen.map(Onderbreking.fromJSON);
    return item;
  }
}
