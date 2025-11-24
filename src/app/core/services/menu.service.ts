import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MenuItem } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl = 'http://localhost:5196/api/menus';

  constructor(private http: HttpClient) {}

  getMenu(): Observable<MenuItem[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => res.data)
    );
  }
}