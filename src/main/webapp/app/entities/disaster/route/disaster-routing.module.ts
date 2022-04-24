import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DisasterComponent } from '../list/disaster.component';
import { DisasterDetailComponent } from '../detail/disaster-detail.component';
import { DisasterUpdateComponent } from '../update/disaster-update.component';
import { DisasterRoutingResolveService } from './disaster-routing-resolve.service';

const disasterRoute: Routes = [
  {
    path: '',
    component: DisasterComponent,
    data: {
      defaultSort: 'disasterId,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':disasterId/view',
    component: DisasterDetailComponent,
    resolve: {
      disaster: DisasterRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DisasterUpdateComponent,
    resolve: {
      disaster: DisasterRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':disasterId/edit',
    component: DisasterUpdateComponent,
    resolve: {
      disaster: DisasterRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(disasterRoute)],
  exports: [RouterModule],
})
export class DisasterRoutingModule {}
