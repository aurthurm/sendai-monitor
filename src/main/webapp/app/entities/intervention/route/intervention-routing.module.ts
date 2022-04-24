import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { InterventionComponent } from '../list/intervention.component';
import { InterventionDetailComponent } from '../detail/intervention-detail.component';
import { InterventionUpdateComponent } from '../update/intervention-update.component';
import { InterventionRoutingResolveService } from './intervention-routing-resolve.service';

const interventionRoute: Routes = [
  {
    path: '',
    component: InterventionComponent,
    data: {
      defaultSort: 'interventionId,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':interventionId/view',
    component: InterventionDetailComponent,
    resolve: {
      intervention: InterventionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InterventionUpdateComponent,
    resolve: {
      intervention: InterventionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':interventionId/edit',
    component: InterventionUpdateComponent,
    resolve: {
      intervention: InterventionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(interventionRoute)],
  exports: [RouterModule],
})
export class InterventionRoutingModule {}
