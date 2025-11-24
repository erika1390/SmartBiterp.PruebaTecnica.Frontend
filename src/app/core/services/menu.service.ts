import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() {}

  getMenu(): MenuItem[] {
    return [
      {
        title: 'Mantenimientos',
        icon: 'settings',
        children: [
          { title: 'Tipos de Gasto', route: '/expense-types' },
          { title: 'Fondo Monetario', route: '/money-funds' }
        ]
      },
      {
        title: 'Movimientos',
        icon: 'sync',
        children: [
          { title: 'Presupuesto por tipo de gasto', route: '/budgets' },
          { title: 'Registros de gastos', route: '/expenses' },
          { title: 'Depósitos', route: '/deposits' }
        ]
      },
      {
        title: 'Consultas y Reportes',
        icon: 'bar_chart',
        children: [
          { title: 'Consulta de movimientos', route: '/movements' },
          { title: 'Gráfico Comparativo Presupuesto y Ejecución', route: '/budget-vs-execution' }
        ]
      }
    ];
  }
}