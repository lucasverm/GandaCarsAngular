import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { EffectieveDienst } from "../modals/effectieve-dienst";
import { EffectieveDienstService } from "../services/effectieve-dienst.service";

@Injectable({
  providedIn: "root",
})
export class EffectieveDienstenByMonthResolver implements Resolve<EffectieveDienst[]> {
  constructor(private effectieveDienstService: EffectieveDienstService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EffectieveDienst[]> {
    var vandaag = new Date();
    return this.effectieveDienstService.getEffectieveDienstenByMonth$(vandaag.getFullYear(), vandaag.getMonth(), route.params["id"]);
  }
}
