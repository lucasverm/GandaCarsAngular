import { DagenVanDeWeek } from "./dagen-van-de-week.enum";

export class Onderbreking {
  id: string;
  startUur: Date;
  eindUur: Date;
  startDag: any;
  eindDag: any;
  effectieveStart: Date;
  effectiefEinde: Date;
  static fromJSON(json: any): Onderbreking {
    var item = new Onderbreking();
    item.id = json.id;
    item.startUur = new Date(json.startUur);
    item.eindUur = new Date(json.eindUur);
    item.startDag = DagenVanDeWeek.properties[json.startDag];
    item.eindDag = DagenVanDeWeek.properties[json.eindDag];
    item.effectieveStart = new Date(json.effectieveStart);
    item.effectiefEinde = new Date(json.effectiefEinde);
    return item;
  }
}
