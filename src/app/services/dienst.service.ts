import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BusChauffeur } from '../modals/bus-chauffeur';
import { Dienst } from '../modals/dienst';


@Injectable({
  providedIn: 'root'
})
export class DienstService {

  constructor(private router: Router, private http: HttpClient) { }

  getDienstById$(id: string): Observable<Dienst> {
    return this.http.get(`${environment.apiUrl}/Dienst/${id}`).pipe(
      catchError(error => {
        return of(null);
      }),
      map((d: any): Dienst => {
        d = Dienst.fromJSON(d);       
        return d;
      })
    );
  }

  addDienst$(naam: string, startUur: Date, eindUur: Date, dag:number, busChauffeurId:string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/BusChauffeur`,
      { naam, startUur, eindUur, dag, busChauffeurId}, { responseType: 'json' })
      .pipe(
        catchError(error => {
          if (error.status == 401) {
          }
          return of(null);
        }),
        map((d: any): Dienst => {
          d = Dienst.fromJSON(d);
          return d;
        })
      );
  }

  getAllDiensten$(): Observable<any[]> {
    return this.http.get(`${environment.apiUrl}/Dienst/getAll`).pipe(
      catchError(error => {
        return of(null);
      }),
      map((list: any[]): any[] => {
        list = list.map(Dienst.fromJSON)
        return list;
      })
    );
  }
}
