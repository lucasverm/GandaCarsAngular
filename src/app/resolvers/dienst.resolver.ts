import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Dienst } from '../modals/dienst';
import { DienstService } from '../services/dienst.service';


@Injectable({
	providedIn: "root"
})
export class DienstResolver implements Resolve<Dienst> {
	constructor(private dienstService: DienstService) { }

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<Dienst> {
		return this.dienstService.getDienstById$(route.params["id"]);
	}
}
