
import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ExpensesService } from './expenses.service';
import { MoneyFundsService } from '../../mantenimientos/money-funds/money-funds.service';
import { ExpenseTypesService } from '../../mantenimientos/expense-types/expense-types.service';
import { Expense, ExpenseDetail } from './expense.model';
import { MoneyFund } from '../../mantenimientos/money-funds/money-fund.model';
import { ExpenseType } from '../../mantenimientos/expense-types/expense-type.model';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent implements OnInit {
  private expensesService = inject(ExpensesService);
  private moneyFundsService = inject(MoneyFundsService);
  private expenseTypesService = inject(ExpenseTypesService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  expenses = signal<Expense[]>([]);
  moneyFunds = signal<MoneyFund[]>([]);
  expenseTypes = signal<ExpenseType[]>([]);
  loading = signal(false);

  displayedColumns = [
    'date',
    'moneyFundName',
    'documentType',
    'storeName',
    'observations',
    'total',
    'actions'
  ];

  expandedExpense: Expense | null = null;

  form: FormGroup = this.fb.group({
    date: [null, Validators.required],
    moneyFundId: [null, Validators.required],
    documentType: ['', Validators.required],
    storeName: ['', Validators.required],
    observations: [''],
    details: this.fb.array([])
  });

  get details(): FormArray {
    return this.form.get('details') as FormArray;
  }

  get detailsDataSource() {
    // Forzar actualización de la tabla al cambiar el array
    return this.details.controls;
  }

  trackByIndex(index: number, obj: any) {
    return index;
  }

  ngOnInit(): void {
    this.loadAll();
    this.addDetail(); // Start with one detail row
  }

  loadAll() {
    this.loading.set(true);
    this.expensesService.getAll().subscribe({
      next: (data) => this.expenses.set(data),
      error: () => this.snackBar.open('Error cargando gastos', 'Cerrar', { duration: 3000 }),
      complete: () => this.loading.set(false)
    });
    this.moneyFundsService.getAll().subscribe({
      next: (data) => this.moneyFunds.set(data),
      error: () => this.snackBar.open('Error cargando fondos', 'Cerrar', { duration: 3000 })
    });
    this.expenseTypesService.getAll().subscribe({
      next: (data) => this.expenseTypes.set(data),
      error: () => this.snackBar.open('Error cargando tipos de gasto', 'Cerrar', { duration: 3000 })
    });
  }

  addDetail() {
    // Permitir agregar detalles siempre, sin importar el estado del formulario
    this.details.push(this.fb.group({
      expenseTypeId: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]]
    }));
  }

  removeDetail(index: number) {
    if (this.details.length > 1) {
      this.details.removeAt(index);
    }
  }

  getExpenseTypeName(id: number): string {
    const type = this.expenseTypes().find(t => t.id === id);
    return type ? type.description : '';
  }

  getMoneyFundName(id: number): string {
    const fund = this.moneyFunds().find(f => f.id === id);
    return fund ? fund.name : '';
  }

  getTotal(details: ExpenseDetail[]): number {
    return details.reduce((sum, d) => sum + (d.amount || 0), 0);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = {
      ...this.form.value,
      date: this.form.value.date ? this.form.value.date.toISOString() : null,
      documentType: Number(this.form.value.documentType),
      details: this.form.value.details.map((d: any) => ({
        expenseTypeId: d.expenseTypeId,
        amount: d.amount
      })),
      request: null // Ajusta este valor según lo que requiera el backend
    };
    this.loading.set(true);
    this.expensesService.create(payload).subscribe({
      next: () => {
        this.snackBar.open('Gasto registrado', 'Cerrar', { duration: 3000 });
        // Reset the form and ensure details FormArray is re-created
        this.form.reset();
        // Remove all controls from details FormArray
        while (this.details.length !== 0) {
          this.details.removeAt(0);
        }
        this.addDetail();
        this.form.enable();
        this.loadAll();
      },
      error: () => this.snackBar.open('Error registrando gasto', 'Cerrar', { duration: 3000 }),
      complete: () => this.loading.set(false)
    });
  }

  deleteExpense(id: number) {
    if (!confirm('¿Eliminar este gasto?')) return;
    this.loading.set(true);
    this.expensesService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Gasto eliminado', 'Cerrar', { duration: 3000 });
        this.loadAll();
      },
      error: () => this.snackBar.open('Error eliminando gasto', 'Cerrar', { duration: 3000 }),
      complete: () => this.loading.set(false)
    });
  }

  toggleExpand(expense: Expense) {
    if (this.expandedExpense === expense) {
      this.expandedExpense = null;
    } else {
      this.expandedExpense = expense;
      this.loadExpenseToForm(expense);
    }
  }

  loadExpenseToForm(expense: Expense) {
    // Convertir string a Date para el datepicker
    const dateValue = expense.date ? new Date(expense.date) : null;
    this.form.patchValue({
      date: dateValue,
      moneyFundId: expense.moneyFundId,
      documentType: expense.documentType,
      storeName: expense.storeName,
      observations: expense.observations
    });
    // Limpiar y cargar detalles
    while (this.details.length !== 0) {
      this.details.removeAt(0);
    }
    expense.details.forEach(d => {
      this.details.push(this.fb.group({
        expenseTypeId: [d.expenseTypeId, Validators.required],
        amount: [d.amount, [Validators.required, Validators.min(0.01)]]
      }));
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
