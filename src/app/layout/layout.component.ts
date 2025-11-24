import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

// Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { MenuService } from '../core/services/menu.service';
import { MenuItem } from '../core/models/menu.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [
    NgFor,
    RouterLink,
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class LayoutComponent implements OnInit {
  menu: MenuItem[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getMenu().subscribe({
      next: (data) => this.menu = data,
      error: (err) => console.error(err)
    });
  }

  toggleSidenav(sidenav: any) {
    sidenav.toggle();
  }
}