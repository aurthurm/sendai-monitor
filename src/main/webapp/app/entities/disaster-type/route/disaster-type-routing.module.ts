import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DisasterTypeComponent } from '../list/disaster-type.component';
import { DisasterTypeDetailComponent } from '../detail/disaster-type-detail.component';
import { DisasterTypeUpdateComponent } from '../update/disaster-type-update.component';
import { DisasterTypeRoutingResolveService } from './disaster-type-routing-resolve.service';

const disasterTypeRoute: Routes = [
  {
    path: '',
    component: DisasterTypeComponent,
    data: {
      defaultSort: 'disasterTypeId,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':disasterTypeId/view',
    component: DisasterTypeDetailComponent,
    resolve: {
      disasterType: DisasterTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DisasterTypeUpdateComponent,
    resolve: {
      disasterType: DisasterTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':disasterTypeId/edit',
    component: DisasterTypeUpdateComponent,
    resolve: {
      disasterType: DisasterTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(disasterTypeRoute)],
  exports: [RouterModule],
})
export class DisasterTypeRoutingModule {}
