import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BudgetVsExecutionService } from './budget-vs-execution.service';
import { BudgetVsExecution } from './budget-vs-execution.model';

@Component({
  selector: 'app-budget-vs-execution',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './budget-vs-execution.component.html',
  styleUrl: './budget-vs-execution.component.scss'
})
export class BudgetVsExecutionComponent implements OnInit {
  start = '';
  end = '';
  data: BudgetVsExecution[] = [];
  consultado = false;
  displayedColumns = ['type', 'budget', 'execution'];

  constructor(private service: BudgetVsExecutionService) {}

  ngOnInit() {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    this.start = firstDay.toISOString().slice(0, 10);
    this.end = lastDay.toISOString().slice(0, 10);
    this.consultar();
  }

  consultar() {
    if (!this.start || !this.end) return;
    this.service.getBudgetVsExecution(this.start, this.end).subscribe({
      next: d => {
        this.data = d;
        this.consultado = true;
      },
      error: () => {
        this.data = [];
        this.consultado = true;
      }
    });
  }
}
