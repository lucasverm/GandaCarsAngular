import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Dienst } from '../modals/dienst';
import { DienstService } from '../services/dienst.service';
import { EffectieveDienst } from '../modals/effectieve-dienst';
import { EffectieveDienstService } from '../services/effectieve-dienst.service';


@Injectable({
	providedIn: "root"
})
export class EffectieveDienstenByMonthResolver implements Resolve<EffectieveDienst[]> {
	constructor(private effectieveDienstService: EffectieveDienstService) { }

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<EffectieveDienst[]> {
		var vandaag = new Date();
		return this.effectieveDienstService.getEffectieveDienstenByMonth$(vandaag.getFullYear(), vandaag.getMonth(), route.params["id"]);
	}
}
