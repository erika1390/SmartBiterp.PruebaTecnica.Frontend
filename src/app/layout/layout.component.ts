import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../core/services/menu.service';
import { MenuItem } from '../core/models/menu.model';

import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

import { RouterLink, RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatButtonModule,
    RouterLink,
    RouterOutlet,
    NgFor,
    NgIf
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  menu: MenuItem[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menu = this.menuService.getMenu();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}