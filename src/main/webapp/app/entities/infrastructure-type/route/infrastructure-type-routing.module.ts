import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { InfrastructureTypeComponent } from '../list/infrastructure-type.component';
import { InfrastructureTypeDetailComponent } from '../detail/infrastructure-type-detail.component';
import { InfrastructureTypeUpdateComponent } from '../update/infrastructure-type-update.component';
import { InfrastructureTypeRoutingResolveService } from './infrastructure-type-routing-resolve.service';

const infrastructureTypeRoute: Routes = [
  {
    path: '',
    component: InfrastructureTypeComponent,
    data: {
      defaultSort: 'infractructureTypeId,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':infractructureTypeId/view',
    component: InfrastructureTypeDetailComponent,
    resolve: {
      infrastructureType: InfrastructureTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InfrastructureTypeUpdateComponent,
    resolve: {
      infrastructureType: InfrastructureTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':infractructureTypeId/edit',
    component: InfrastructureTypeUpdateComponent,
    resolve: {
      infrastructureType: InfrastructureTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(infrastructureTypeRoute)],
  exports: [RouterModule],
})
export class InfrastructureTypeRoutingModule {}
