import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Dienst } from '../modals/dienst';
import { DienstService } from '../services/dienst.service';
import { EffectieveDienst } from '../modals/effectieve-dienst';
import { EffectieveDienstService } from '../services/effectieve-dienst.service';
import { InstellingenService } from '../services/instellingen.service';
import { Instellingen } from '../modals/instellingen';


@Injectable({
	providedIn: "root"
})
export class InstellingenResolver implements Resolve<Instellingen> {
	constructor(private instellingenService: InstellingenService) { }

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<Instellingen> {
		return this.instellingenService.getInstellingen$();
	}
}
