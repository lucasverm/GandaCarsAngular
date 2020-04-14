import { BusChauffeur } from './bus-chauffeur';
import { DagenVanDeWeek } from './dagen-van-de-week.enum';
import { Stationnement } from './stationnement';

export class Dienst {
	id: string;
	naam: string;
	startUur: Date;
	eindUur: Date;
	startDag: any;
	eindDag: any;
	busChauffeur: BusChauffeur;
	stationnementen: Stationnement[];

	static fromJSON(json: any): Dienst {
		var item = new Dienst();
		item.id = json.id;
		item.naam = json.naam;
		item.startUur = new Date(json.startUur);
		item.eindUur = new Date(json.eindUur);
		item.startDag = DagenVanDeWeek.properties[json.startDag];
		item.eindDag = DagenVanDeWeek.properties[json.eindDag];
		item.busChauffeur = json.busChauffeur;
		item.stationnementen = json.stationnementen.map(Stationnement.fromJSON)
		return item;
	}
}
