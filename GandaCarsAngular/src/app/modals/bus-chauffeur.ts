import { Dienst } from "./dienst";

export class BusChauffeur {
  id: string;
  voornaam: string;
  achternaam: string;
  uurloon: number;
  email: string;
  geboorteDatum: Date;
  diensten: Dienst[];
  constructor() {}

  static fromJSON(json: any): BusChauffeur {
    var item = new BusChauffeur();
    item.id = json.id;
    item.voornaam = json.voornaam;
    item.achternaam = json.achternaam;
    item.uurloon = json.uurloon;
    item.email = json.email;
    item.geboorteDatum = new Date(json.geboorteDatum);
    item.diensten = json.diensten.map(Dienst.fromJSON);
    return item;
  }
}
