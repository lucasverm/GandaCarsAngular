import { BusChauffeur } from './bus-chauffeur';
import { Dienst } from './dienst';
import { DagenVanDeWeek } from './dagen-van-de-week.enum';
import { Onderbreking } from './onderbreking';

export class EffectieveDienst {
	id: string;
	naam: string;
	start: Date;
	einde: Date;
	busChauffeurId: BusChauffeur;
	totaalAantalMinutenStationnement: number;
	gerelateerdeDienst: EffectieveDienst;
	dagVanToevoegen: Date;
	andereMinuten: number;
	onderbrekingen: Onderbreking[];
	static fromJSON(json: any): EffectieveDienst {
		var item = new EffectieveDienst();
		item.id = json.id;
		item.naam = json.naam;
		item.start = new Date(json.start);
		item.einde = new Date(json.eind);
		item.busChauffeurId = json.busChauffeur.id;
		item.totaalAantalMinutenStationnement = json.totaalAantalMinutenStationnement
		item.gerelateerdeDienst = json.gerelateerdeDienst;
		item.dagVanToevoegen = json.dagVanToevoegen;
		item.andereMinuten = json.andereMinuten;
		item.onderbrekingen = json.onderbrekingen.map(Onderbreking.fromJSON);
		return item;
	}
}
