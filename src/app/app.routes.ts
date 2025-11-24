
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [

      // =============================
      // MANTENIMIENTOS
      // =============================
      {
        path: 'mantenimientos/expense-types',
        loadComponent: () =>
          import('./modules/mantenimientos/expense-types/expense-types.component')
            .then(c => c.ExpenseTypesComponent)
      },
      {
        path: 'mantenimientos/money-funds',
        loadComponent: () =>
          import('./modules/mantenimientos/money-funds/money-funds.component')
            .then(c => c.MoneyFundsComponent)
      },

      // =============================
      // MOVIMIENTOS
      // =============================
        {
          path: 'movimientos/budgets',
          loadComponent: () =>
            import('./modules/movimientos/budgets/budgets.component')
              .then(c => c.BudgetsComponent)
        },
      {
        path: 'movimientos/expenses',
        loadComponent: () =>
          import('./modules/movimientos/expenses/expenses.component')
            .then(c => c.ExpensesComponent)
      },
      {
        path: 'movimientos/deposits',
        loadComponent: () =>
          import('./modules/movimientos/deposits/deposits.component')
            .then(c => c.DepositsComponent)
      },

      // =============================
      // REPORTES
      // =============================
      {
        path: 'reportes/budget-vs-execution',
        loadComponent: () =>
          import('./modules/reportes/budget-vs-execution/budget-vs-execution.component')
            .then(c => c.BudgetVsExecutionComponent)
      },
      {
        path: 'reportes/movements',
        loadComponent: () =>
          import('./modules/reportes/movements/movements.component')
            .then(c => c.MovementsComponent)
      },

      // =============================
      // DEFAULT
      // =============================
      {
        path: '',
        redirectTo: 'mantenimientos/expense-types',
        pathMatch: 'full'
      }
    ]
  },

  // =============================
  // 404
  // =============================
  { path: '**', redirectTo: 'mantenimientos/expense-types' }
];