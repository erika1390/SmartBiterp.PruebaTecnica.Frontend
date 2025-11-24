import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MoneyFund } from './money-fund.model';

@Injectable({ providedIn: 'root' })
export class MoneyFundsService {
  private apiUrl = 'http://localhost:5196/api/MoneyFund';

  constructor(private http: HttpClient) {}

  getAll(): Observable<MoneyFund[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((res: any) => res.data as MoneyFund[])
    );
  }

  create(payload: MoneyFund): Observable<MoneyFund> {
    return this.http.post<MoneyFund>(this.apiUrl, payload);
  }

  update(id: number, payload: MoneyFund): Observable<MoneyFund> {
    return this.http.put<MoneyFund>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}