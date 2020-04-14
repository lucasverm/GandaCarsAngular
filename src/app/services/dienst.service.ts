import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BusChauffeur } from '../modals/bus-chauffeur';
import { Dienst } from '../modals/dienst';
import { Stationnement } from '../modals/stationnement';


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

  addDienst$(
    naam: string,
    startDag: number,
    startUur: Date,
    eindDag: number,
    eindUur: Date,
    busChauffeurId: string,
    stationnementen: Stationnement[]): Observable<Dienst> {
    return this.http.post<Dienst>(`${environment.apiUrl}/Dienst`,
      { naam, startUur, eindUur, startDag, eindDag, busChauffeurId, stationnementen }, { responseType: 'json' })
      .pipe(
        catchError(error => {
          return throwError(error);
        }),
        map((d: any): Dienst => {
          d = Dienst.fromJSON(d);
          return d;
        })
      );
  }

  deleteDienst$(d: Dienst): Observable<Dienst> {
    return this.http.delete<Dienst>(`${environment.apiUrl}/Dienst/${d.id}`).pipe(
      catchError(error => {
        return throwError(error)
      }),
      map((item: any): Dienst => {
        item = Dienst.fromJSON(item);
        return item;
      })
    );
  }

  putDienst$(dienst: Dienst): Observable<Dienst> {
    return this.http.put<Dienst>(`${environment.apiUrl}/Dienst/${dienst.id}`,
      {
        id: dienst.id,
        naam: dienst.naam,
        startDag: dienst.startDag,
        startUur: dienst.startUur,
        eindDag: dienst.eindDag,
        eindUur: dienst.eindUur,
        busChauffeurId: dienst.busChauffeur.id,
        stationnementen: dienst.stationnementen
      }, { responseType: 'json' })
      .pipe(
        catchError(error => {
          return throwError(error);
        }),
        map((item: any): Dienst => {
          item = Dienst.fromJSON(item);
          return item;
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
