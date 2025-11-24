import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MovementReport } from './movement.model';

@Injectable({ providedIn: 'root' })
export class MovementsService {
  private apiUrl = 'http://localhost:5196/api/Report/movements';

  constructor(private http: HttpClient) {}

  getMovements(start: string, end: string): Observable<MovementReport[]> {
    return this.http.get<any>(`${this.apiUrl}?start=${start}&end=${end}`)
      .pipe(
        map(res => res.data as MovementReport[])
      );
  }
}
