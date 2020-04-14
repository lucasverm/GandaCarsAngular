import { DagenVanDeWeek } from './dagen-van-de-week.enum';

export class Stationnement {
	id: String;
	startUur: Date;
	eindUur: Date;
	tarief: number
	dag: any;
	static fromJSON(json: any): Stationnement {
		var item = new Stationnement();
		item.id = json.id;
		item.startUur = new Date(json.startUur);
		item.eindUur = new Date(json.eindUur);
		item.tarief = json.tarief;
		item.dag = DagenVanDeWeek.properties[json.dag];
		return item;
	}
}
