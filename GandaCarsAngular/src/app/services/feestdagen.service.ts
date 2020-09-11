import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Feestdag } from "../modals/feestdag";

@Injectable({
  providedIn: "root",
})
export class FeestdagenService {
  constructor(private router: Router, private http: HttpClient) {}

  getAllFeestdagen$(): Observable<Feestdag[]> {
    return this.http.get<Feestdag[]>(`${environment.apiUrl}/Feestdag/getAll`).pipe(
      catchError((error) => {
        return throwError(error);
      }),
      map((list: any[]): Feestdag[] => {
        list = list.map(Feestdag.fromJSON);
        return list;
      })
    );
  }

  postAllFeestdagen$(feestdagen: Feestdag[]): Observable<Feestdag[]> {
    return this.http
      .post<Feestdag[]>(`${environment.apiUrl}/Feestdag`, feestdagen, { responseType: "json" })
      .pipe(
        catchError((error) => {
          return throwError(error);
        }),
        map((fd: any[]): Feestdag[] => {
          fd = fd.map(Feestdag.fromJSON);
          return fd;
        })
      );
  }
}
