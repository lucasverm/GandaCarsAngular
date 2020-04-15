import { BusChauffeur } from './bus-chauffeur';
import { Stationnement } from './stationnement';
import { Dienst } from './dienst';
import { DagenVanDeWeek } from './dagen-van-de-week.enum';

export class EffectieveDienst {
	id: string;
	naam: string;
	start: Date;
	einde: Date;
	busChauffeurId: BusChauffeur;
	stationnementen: Stationnement[];

	static fromJSON(json: any): EffectieveDienst {
		var item = new EffectieveDienst();
		item.id = json.id;
		item.naam = json.naam;
		item.start = new Date(json.start);
		item.einde = new Date(json.eind);
		item.busChauffeurId = json.busChauffeur.id;
		item.stationnementen = json.stationnementen.map(Stationnement.fromJSON)
		return item;
	}
}
