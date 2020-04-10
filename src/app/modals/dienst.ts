export class Dienst {
	id: string;
	naam: string;
	startUur: Date;
	eindUur: Date;
	dag: Date;

	static fromJSON(json: any): Dienst {
		var item = new Dienst();
		item.id = json.id;
		item.naam = json.naam;
		item.startUur = new Date(json.startUur);
		item.eindUur = new Date(json.eindUur);
		item.dag = new Date(json.dag);
		return item;
	}
}
