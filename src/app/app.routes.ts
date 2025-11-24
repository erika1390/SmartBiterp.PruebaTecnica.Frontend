import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'mantenimientos/expense-types',
        loadComponent: () =>
          import('./modules/mantenimientos/expense-types/expense-types.component')
            .then(m => m.ExpenseTypesComponent)
      },
      {
        path: 'mantenimientos/money-funds',
        loadComponent: () =>
          import('./modules/mantenimientos/money-funds/money-funds.component')
            .then(m => m.MoneyFundsComponent)
      },
      {
        path: '',
        redirectTo: 'mantenimientos/expense-types',
        pathMatch: 'full'
      }
    ]
  }
];