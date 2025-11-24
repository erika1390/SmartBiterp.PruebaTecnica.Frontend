import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ExpenseType } from './expense-type.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseTypesService {

  private apiUrl = 'http://localhost:5196/api/ExpenseType';

  constructor(private http: HttpClient) {}

  // GET /api/ExpenseType
  getAll(): Observable<ExpenseType[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((res: any) => res.data as ExpenseType[])
    );
  }

  // GET /api/ExpenseType/{id}
  getById(id: number): Observable<ExpenseType> {
    return this.http.get<ExpenseType>(`${this.apiUrl}/${id}`);
  }

  // POST /api/ExpenseType
  create(payload: ExpenseType): Observable<ExpenseType> {
    return this.http.post<ExpenseType>(this.apiUrl, payload);
  }

  // PUT /api/ExpenseType/{id}
  update(id: number, payload: ExpenseType): Observable<ExpenseType> {
    return this.http.put<ExpenseType>(`${this.apiUrl}/${id}`, payload);
  }

  // DELETE /api/ExpenseType/{id}
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // GET /api/ExpenseType/next-code
  getNextCode(): Observable<string> {
    return this.http.get(`${this.apiUrl}/next-code`, { responseType: 'text' });
  }
}