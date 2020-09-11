import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Instellingen } from "../modals/instellingen";
import { InstellingenService } from "../services/instellingen.service";

@Injectable({
  providedIn: "root",
})
export class InstellingenResolver implements Resolve<Instellingen> {
  constructor(private instellingenService: InstellingenService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Instellingen> {
    return this.instellingenService.getInstellingen$();
  }
}
