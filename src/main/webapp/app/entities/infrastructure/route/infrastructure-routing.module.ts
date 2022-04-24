import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { InfrastructureComponent } from '../list/infrastructure.component';
import { InfrastructureDetailComponent } from '../detail/infrastructure-detail.component';
import { InfrastructureUpdateComponent } from '../update/infrastructure-update.component';
import { InfrastructureRoutingResolveService } from './infrastructure-routing-resolve.service';

const infrastructureRoute: Routes = [
  {
    path: '',
    component: InfrastructureComponent,
    data: {
      defaultSort: 'infractructureId,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':infractructureId/view',
    component: InfrastructureDetailComponent,
    resolve: {
      infrastructure: InfrastructureRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InfrastructureUpdateComponent,
    resolve: {
      infrastructure: InfrastructureRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':infractructureId/edit',
    component: InfrastructureUpdateComponent,
    resolve: {
      infrastructure: InfrastructureRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(infrastructureRoute)],
  exports: [RouterModule],
})
export class InfrastructureRoutingModule {}
