import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BudgetService } from './budget.service';
import { Budget } from './budget.model';
import { ExpenseTypesService } from '../../mantenimientos/expense-types/expense-types.service';
import { ExpenseType } from '../../mantenimientos/expense-types/expense-type.model';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent {
  budgets: Budget[] = [];
  expenseTypes: ExpenseType[] = [];
  form: Budget = { id: 0, expenseTypeId: 0, expenseTypeName: '', year: new Date().getFullYear(), month: new Date().getMonth() + 1, allocatedAmount: 0, status: 'Normal' };
  isEditing = false;
  filterYear = new Date().getFullYear();
  filterMonth = new Date().getMonth() + 1;

  constructor(private service: BudgetService, private expenseTypeService: ExpenseTypesService) {}

  ngOnInit(): void {
    this.loadAll();
    this.expenseTypeService.getAll().subscribe({
      next: res => this.expenseTypes = res,
      error: err => console.error(err)
    });
  }

  loadAll() {
    this.service.getAll(this.filterYear, this.filterMonth).subscribe({
      next: res => this.budgets = res,
      error: err => console.error(err)
    });
  }

  new() {
    this.isEditing = false;
    this.form = { id: 0, expenseTypeId: 0, expenseTypeName: '', year: this.filterYear, month: this.filterMonth, allocatedAmount: 0, status: 'Normal' };
  }

  edit(item: Budget) {
    this.isEditing = true;
    this.form = { ...item };
  }

  save() {
    const payload = {
      expenseTypeId: this.form.expenseTypeId,
      year: this.form.year,
      month: this.form.month,
      allocatedAmount: this.form.allocatedAmount
    };
    this.service.create(payload).subscribe({
      next: () => {
        this.loadAll();
        this.new();
      }
    });
  }

  delete(id: number) {
    if (confirm('¿Deseas eliminar este registro?')) {
      this.service.delete(id).subscribe({
        next: () => this.loadAll()
      });
    }
  }

  onFilterChange() {
    this.loadAll();
  }
}
