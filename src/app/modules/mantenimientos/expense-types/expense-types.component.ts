import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseTypesService } from './expense-types.service';
import { ExpenseType } from './expense-type.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expense-types',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-types.component.html',
  styleUrls: ['./expense-types.component.scss']
})
export class ExpenseTypesComponent {
  expenseTypes: ExpenseType[] = [];
  form: ExpenseType = { id: 0, description: '', category: '' };
  isEditing = false;

  constructor(private service: ExpenseTypesService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.service.getAll().subscribe({
      next: res => this.expenseTypes = res,
      error: err => console.error(err)
    });
  }

  new() {
    this.isEditing = false;
    this.form = { id: 0, description: '', category: '' };
  }

  edit(item: ExpenseType) {
    this.isEditing = true;
    this.form = { ...item };
  }

  save() {
    if (this.isEditing) {
      this.service.update(this.form.id, this.form).subscribe({
        next: () => {
          this.loadAll();
          this.new();
        }
      });
    } else {
      this.service.create(this.form).subscribe({
        next: () => {
          this.loadAll();
          this.new();
        }
      });
    }
  }

  delete(id: number) {
    if (confirm('¿Deseas eliminar este registro?')) {
      this.service.delete(id).subscribe({
        next: () => this.loadAll()
      });
    }
  }
}