
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoneyFundsService } from './money-funds.service';
import { MoneyFund } from './money-fund.model';

@Component({
  selector: 'app-money-funds',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './money-funds.component.html',
  styleUrls: ['./money-funds.component.scss']
})
export class MoneyFundsComponent {
  moneyFunds: MoneyFund[] = [];
  form: MoneyFund = { id: 0, name: '', fundType: 'CashBox', initialBalance: 0 };
  isEditing = false;

  constructor(private service: MoneyFundsService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.service.getAll().subscribe({
      next: res => this.moneyFunds = res,
      error: err => console.error(err)
    });
  }

  new() {
    this.isEditing = false;
    this.form = { id: 0, name: '', fundType: 'CashBox', initialBalance: 0 };
  }

  edit(item: MoneyFund) {
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
