import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';


import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EntitiesAdminComponent } from './entities-admin.component';

@Injectable({ providedIn: 'root' })
export class EntityAdminResolve {}

export const entityAdminRoute: Routes = [
  {
    path: '',
    component: EntitiesAdminComponent,
    data: {
      pageTitle: 'centralRepositoryApp.client.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
