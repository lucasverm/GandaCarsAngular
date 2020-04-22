import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Feestdag } from '../modals/feestdag';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Instellingen } from '../modals/instellingen';

@Injectable({
  providedIn: 'root'
})
export class InstellingenService {

  public instellingen: Instellingen;
  constructor(private router: Router, private http: HttpClient) { }

  getInstellingen$(): Observable<Instellingen> {
    return this.http.get<Instellingen>(`${environment.apiUrl}/Instellingen`).pipe(
      catchError(error => {
        return throwError(error);
      }),
      map((item: any): Instellingen => {
        item = Instellingen.fromJSON(item)
        this.instellingen = item;
        return item;
      })
    );
  }

  putInstellingen$(instellingen: Instellingen): Observable<Instellingen> {
    return this.http.put<Instellingen>(`${environment.apiUrl}/Instellingen`, instellingen,
      { responseType: 'json' })
      .pipe(
        catchError(error => {
          return throwError(error);
        }),
        map((item: any): Instellingen => {
          item = Instellingen.fromJSON(item)
          this.instellingen = item;
          return item;
        })
      );
  }
}
