import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BudgetVsExecution, BudgetVsExecutionApiResponse } from './budget-vs-execution.model';

@Injectable({ providedIn: 'root' })
export class BudgetVsExecutionService {
  private apiUrl = environment.apiUrl + '/Report/budget-vs-execution';

  constructor(private http: HttpClient) {}

  getBudgetVsExecution(start: string, end: string): Observable<BudgetVsExecution[]> {
    const url = `${this.apiUrl}?start=${start}&end=${end}`;
    return this.http.get<BudgetVsExecutionApiResponse>(url).pipe(
      map(resp => resp.data)
    );
  }
}
