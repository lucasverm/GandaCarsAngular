import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BusChauffeur } from '../modals/bus-chauffeur';

@Injectable({
  providedIn: 'root'
})
export class BusChauffeurService {

  constructor(private router: Router, private http: HttpClient) { }

  getBusChauffeurById$(id: string): Observable<BusChauffeur> {
    return this.http.get<BusChauffeur>(`${environment.apiUrl}/busChauffeur/${id}`).pipe(
      catchError(error => {
        return throwError(error);
      }),
      map((bc: any): BusChauffeur => {
        bc = BusChauffeur.fromJSON(bc);
        return bc;
      })
    );
  }

  addBusChauffeur$(voornaam: string, achternaam: string, uurloon: string, email: String, geboorteDatum: Date): Observable<BusChauffeur> {
    return this.http.post<BusChauffeur>(`${environment.apiUrl}/BusChauffeur`,
      { voornaam, achternaam, uurloon, email, geboorteDatum }, { responseType: 'json' })
      .pipe(
        catchError(error => {
          return throwError(error);
        }),
        map((bc: any): BusChauffeur => {
          bc = BusChauffeur.fromJSON(bc);
          return bc;
        })
      );
  }

  putBusChauffeur$(bc: BusChauffeur): Observable<BusChauffeur> {
    return this.http.put<BusChauffeur>(`${environment.apiUrl}/BusChauffeur/${bc.id}`,
      {
        id: bc.id,
        voornaam: bc.voornaam,
        achternaam: bc.achternaam,
        uurloon: bc.uurloon,
        email: bc.email,
        geboorteDatum:
          bc.geboorteDatum
      }, { responseType: 'json' })
      .pipe(
        catchError(error => {
          return throwError(error);
        }),
        map((bc: any): BusChauffeur => {
          bc = BusChauffeur.fromJSON(bc);
          return bc;
        })
      );
  }

  deleteBusChauffeur$(bc: BusChauffeur): Observable<BusChauffeur> {
    return this.http.delete<BusChauffeur>(`${environment.apiUrl}/BusChauffeur/${bc.id}`).pipe(
      catchError(error => {
        return throwError(error)
      }),
      map((item: any): BusChauffeur => {
        item = BusChauffeur.fromJSON(item);
        return item;
      })
    );
  }

  getAllBusCheuffeurs$(): Observable<BusChauffeur[]> {
    return this.http.get<BusChauffeur[]>(`${environment.apiUrl}/BusChauffeur/getAll`).pipe(
      catchError(error => {
        return throwError(error);
      }),
      map((list: any[]): any[] => {
        list = list.map(BusChauffeur.fromJSON)
        return list;
      })
    );
  }

}
