import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Dienst } from '../modals/dienst';
import { EffectieveDienst } from '../modals/effectieve-dienst';

@Injectable({
  providedIn: 'root'
})
export class EffectieveDienstService {

  constructor(private router: Router, private http: HttpClient) { }

  getEffectievieDienstenNullDienstenNaarEffectieveDiensten$(jaar: string, week: string, busChauffeurId: string): Observable<EffectieveDienst[]> {
    return this.http.get(`${environment.apiUrl}/EffectieveDiensten/getEffectievieDienstenNullDienstenNaarEffectieveDiensten/${jaar}/${week}/${busChauffeurId}`).pipe(
      catchError(error => {
        return throwError(error);
      }),
      map((list: any[]): any[] => {
        list = list.map(EffectieveDienst.fromJSON)
        return list;
      })
    );
  }

  getEffectieveDiensten$(jaar: string, week: string, busChauffeurId: string): Observable<EffectieveDienst[]> {
    return this.http.get(`${environment.apiUrl}/EffectieveDiensten/${jaar}/${week}/${busChauffeurId}`).pipe(
      catchError(error => {
        return throwError(error);
      }),
      map((list: any[]): any[] => {
        list = list.map(EffectieveDienst.fromJSON)
        return list;
      })
    );
  }

  getEffectieveDienstenByMonth$(jaar: number, maand: number, busChauffeurId: string): Observable<EffectieveDienst[]> {
    return this.http.get(`${environment.apiUrl}/EffectieveDiensten/getByMonth/${jaar}/${(maand + 1)}/${busChauffeurId}`).pipe(
      catchError(error => {
        return throwError(error);
      }),
      map((list: any[]): any[] => {
        list = list.map(EffectieveDienst.fromJSON)
        return list;
      })
    );
  }

  postEffectieveDiensten$(jaar: string, week: string, busChauffeurId: string, ed: EffectieveDienst[]): Observable<EffectieveDienst[]> {
    return this.http.post(`${environment.apiUrl}/EffectieveDiensten/${jaar}/${week}/${busChauffeurId}`,
      ed).pipe(
        catchError(error => {
          return throwError(error);
        }),
        map((list: any[]): any[] => {
          list = list.map(EffectieveDienst.fromJSON)
          return list;
        })
      );
  }

  deleteEffectieveDiensten$(jaar: string, week: string, busChauffeurId: string): Observable<EffectieveDienst[]> {
    return this.http.delete(`${environment.apiUrl}/EffectieveDiensten/verwijderDiensten/${jaar}/${week}/${busChauffeurId}`).pipe(
      catchError(error => {
        return throwError(error);
      }),
      map((list: any[]): any[] => {
        list = list.map(EffectieveDienst.fromJSON)
        return list;
      })
    );
  }
}
