import { DagenVanDeWeek } from './dagen-van-de-week.enum';

export class Stationnement {
	id: String;
	aantalMinuten: number;
	percentage: number;
	static fromJSON(json: any): Stationnement {
		var item = new Stationnement();
		item.id = json.id;
		item.percentage = json.percentage;
		item.aantalMinuten = json.aantalMinuten
		return item;
	}
}
