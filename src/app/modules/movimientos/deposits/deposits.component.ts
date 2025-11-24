import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepositsService } from './deposits.service';
import { Deposit } from './deposit.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MoneyFundsService } from '../../mantenimientos/money-funds/money-funds.service';
import { MoneyFund } from '../../mantenimientos/money-funds/money-fund.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-deposits',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './deposits.component.html',
  styleUrl: './deposits.component.scss'
})
export class DepositsComponent implements OnInit {
  private depositsService = inject(DepositsService);
  private fb = inject(FormBuilder);
  private moneyFundsService = inject(MoneyFundsService);

  deposits = signal<Deposit[]>([]);
  loading = signal(false);
  moneyFunds = signal<MoneyFund[]>([]);

  displayedColumns = ['id', 'moneyFundName', 'amount', 'date'];

  filterForm: FormGroup = this.fb.group({
    start: [null],
    end: [null]
  });

  createForm: FormGroup = this.fb.group({
    date: [null],
    moneyFundId: [null],
    amount: [null]
  });

  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = today;
    this.filterForm.patchValue({
      start,
      end
    });
    this.createForm.patchValue({
      date: today
    });
    this.fetchMoneyFunds();
    this.fetchDeposits();
  }

  fetchMoneyFunds() {
    this.moneyFundsService.getAll().subscribe({
      next: (data) => this.moneyFunds.set(data || []),
      error: () => this.moneyFunds.set([])
    });
  }

  fetchDeposits() {
    const { start, end } = this.filterForm.value;
    if (!start || !end) return;
    this.loading.set(true);
    this.depositsService.getAll(
      this.formatDate(start),
      this.formatDate(end)
    ).subscribe({
      next: (data) => this.deposits.set(data),
      complete: () => this.loading.set(false)
    });
  }

  createDeposit() {
    if (this.createForm.invalid) return;
    const value = this.createForm.value;
    const payload = {
      ...value,
      date: value.date ? value.date.toISOString() : null,
      moneyFundId: Number(value.moneyFundId),
      amount: Number(value.amount)
    };
    this.loading.set(true);
    this.depositsService.create(payload).subscribe({
      next: () => {
        this.snackBar.open('Depósito registrado', 'Cerrar', { duration: 3000 });
        this.createForm.reset({ date: new Date(), moneyFundId: null, amount: null });
        this.fetchDeposits();
      },
      error: () => this.snackBar.open('Error registrando depósito', 'Cerrar', { duration: 3000 }),
      complete: () => this.loading.set(false)
    });
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
