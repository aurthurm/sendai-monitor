import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { HazardComponent } from '../list/hazard.component';
import { HazardDetailComponent } from '../detail/hazard-detail.component';
import { HazardUpdateComponent } from '../update/hazard-update.component';
import { HazardRoutingResolveService } from './hazard-routing-resolve.service';

const hazardRoute: Routes = [
  {
    path: '',
    component: HazardComponent,
    data: {
      defaultSort: 'hazardId,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':hazardId/view',
    component: HazardDetailComponent,
    resolve: {
      hazard: HazardRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HazardUpdateComponent,
    resolve: {
      hazard: HazardRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':hazardId/edit',
    component: HazardUpdateComponent,
    resolve: {
      hazard: HazardRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(hazardRoute)],
  exports: [RouterModule],
})
export class HazardRoutingModule {}
