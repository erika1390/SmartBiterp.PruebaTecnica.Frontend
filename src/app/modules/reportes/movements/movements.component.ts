import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MovementsService } from './movements.service';
import { MovementReport } from './movement.model';

@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.scss'
})
export class MovementsComponent implements OnInit {
  start = '';
  end = '';
  movements: MovementReport[] = [];
  consultado = false;
  displayedColumns = ['type', 'date', 'storeName', 'amount'];

  constructor(private service: MovementsService) {}

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
    this.service.getMovements(this.start, this.end).subscribe({
      next: data => {
        this.movements = data;
        this.consultado = true;
      },
      error: () => {
        this.movements = [];
        this.consultado = true;
      }
    });
  }
}
