import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Deposit } from './deposit.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DepositsService {
  private apiUrl = `${environment.apiUrl}/Deposit`;

  constructor(private http: HttpClient) {}

  getAll(start: string, end: string): Observable<Deposit[]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(res => res.data as Deposit[])
    );
  }

  create(payload: Partial<Deposit>): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }
}
