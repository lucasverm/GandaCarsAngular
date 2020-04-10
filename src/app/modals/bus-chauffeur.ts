export class BusChauffeur {
	id: string;
	voornaam: string;
	achternaam: string;
	uurloon: number;
	constructor() { }

	static fromJSON(json: any): BusChauffeur {
		var item = new BusChauffeur();
		item.id = json.id;
		item.voornaam = json.voornaam;
		item.achternaam = json.achternaam;
		item.uurloon = json.uurloon;
		return item;
	}
}
