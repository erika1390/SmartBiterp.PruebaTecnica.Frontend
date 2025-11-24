import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Budget } from './budget.model';

type BudgetPayload = {
  expenseTypeId: number;
  year: number;
  month: number;
  allocatedAmount: number;
};

@Injectable({ providedIn: 'root' })
export class BudgetService {
  private apiUrl = 'http://localhost:5196/api/Budget';

  constructor(private http: HttpClient) {}

  getAll(year: number, month: number): Observable<Budget[]> {
    return this.http.get<any>(`${this.apiUrl}?year=${year}&month=${month}`).pipe(
      map((res: any) => res.data as Budget[])
    );
  }

  create(payload: BudgetPayload): Observable<Budget> {
    return this.http.post<Budget>(this.apiUrl, payload);
  }


  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}