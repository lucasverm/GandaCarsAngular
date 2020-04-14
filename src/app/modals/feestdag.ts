export class Feestdag {
          id: string;
          dag: Date;
          naam: string;

          static fromJSON(json: any): Feestdag {
		var item = new Feestdag();
		item.id = json.id;
		item.naam = json.naam;
		item.dag = new Date(json.dag);
		return item;
	}
}
