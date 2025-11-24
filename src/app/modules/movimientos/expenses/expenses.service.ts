import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Expense } from './expense.model';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ExpensesService {
  private apiUrl = `${environment.apiUrl}/Expense`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Expense[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((res: any) => res.data as Expense[])
    );
  }

  create(payload: any): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, payload);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}