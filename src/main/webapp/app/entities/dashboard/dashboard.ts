import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

@Injectable({ providedIn: 'root' })
export class DashboardResolve {}

export const dashBoardRoute: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      pageTitle: '',
    },
  },
];
