import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CasualtyComponent } from '../list/casualty.component';
import { CasualtyDetailComponent } from '../detail/casualty-detail.component';
import { CasualtyUpdateComponent } from '../update/casualty-update.component';
import { CasualtyRoutingResolveService } from './casualty-routing-resolve.service';

const casualtyRoute: Routes = [
  {
    path: '',
    component: CasualtyComponent,
    data: {
      defaultSort: 'casualtyId,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':casualtyId/view',
    component: CasualtyDetailComponent,
    resolve: {
      casualty: CasualtyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CasualtyUpdateComponent,
    resolve: {
      casualty: CasualtyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':casualtyId/edit',
    component: CasualtyUpdateComponent,
    resolve: {
      casualty: CasualtyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(casualtyRoute)],
  exports: [RouterModule],
})
export class CasualtyRoutingModule {}
