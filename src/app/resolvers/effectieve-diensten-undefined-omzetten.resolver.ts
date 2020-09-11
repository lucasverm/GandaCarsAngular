import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { EffectieveDienst } from "../modals/effectieve-dienst";
import { EffectieveDienstService } from "../services/effectieve-dienst.service";

@Injectable({
  providedIn: "root",
})
export class EffectieveDienstenUndefinedOmzettenResolver implements Resolve<EffectieveDienst[]> {
  constructor(private effectieveDienstService: EffectieveDienstService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EffectieveDienst[]> {
    return this.effectieveDienstService.getEffectievieDienstenUndefinedDienstenNaarEffectieveDiensten$(route.params["jaar"], route.params["week"], route.params["buschauffeurid"]);
  }
}
