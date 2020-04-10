import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BusChauffeur } from '../modals/bus-chauffeur';
import { BusChauffeurService } from '../services/bus-chauffeur.service';


@Injectable({
	providedIn: "root"
})
export class BusChauffeurResolver implements Resolve<BusChauffeur> {
	constructor(private busChauffeurService: BusChauffeurService) { }

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<BusChauffeur> {
		return this.busChauffeurService.getBusChauffeurById$(route.params["id"]);
	}
}
