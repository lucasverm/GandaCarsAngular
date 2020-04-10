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

  getBusChauffeurById$(id: string): Observable<BusChauffeur> {
    return this.http.get(`${environment.apiUrl}/busChauffeur/${id}`).pipe(
      catchError(error => {
        return of(null);
      }),
      map((bc: any): BusChauffeur => {
        bc = BusChauffeur.fromJSON(bc);
        return bc;
      })
    );
  }

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

  getAllBusCheuffeurs$(): Observable<any[]> {
    return this.http.get(`${environment.apiUrl}/BusChauffeur/getAll`).pipe(
      catchError(error => {
        return of(null);
      }),
      map((list: any[]): any[] => {
        list = list.map(BusChauffeur.fromJSON)
        return list;
      })
    );
  }

}
