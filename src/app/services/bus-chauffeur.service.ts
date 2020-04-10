import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BusChauffeur } from '../modals/bus-chauffeur';

@Injectable({
  providedIn: 'root'
})
export class BusChauffeurService {

  constructor(private router: Router, private http: HttpClient) { }

  addBusChauffeur$(voornaam: string, achternaam: string, uurloon: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/BusChauffeur`,
      { voornaam, achternaam, uurloon }, { responseType: 'json' })
      .pipe(
        catchError(error => {
          if (error.status == 401) {
          }
          return of(null);
        }),
        map((bc: any): BusChauffeur => {
          bc = BusChauffeur.fromJSON(bc);
          return bc;
        })
      );
  }

}
