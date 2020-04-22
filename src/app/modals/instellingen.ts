export class Instellingen {
          id: string;
          aantalMinutenAdministratieveTijdVoorDienst: number;
          stelsel: number;
          static fromJSON(json: any): Instellingen {
                    var item = new Instellingen();
                    item.id = json.id;
                    item.aantalMinutenAdministratieveTijdVoorDienst = json.aantalMinutenAdministratieveTijdVoorDienst;
                    item.stelsel = json.stelsel;
                    return item;
          }
}
