import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ResponseTeamComponent } from '../list/response-team.component';
import { ResponseTeamDetailComponent } from '../detail/response-team-detail.component';
import { ResponseTeamUpdateComponent } from '../update/response-team-update.component';
import { ResponseTeamRoutingResolveService } from './response-team-routing-resolve.service';

const responseTeamRoute: Routes = [
  {
    path: '',
    component: ResponseTeamComponent,
    data: {
      defaultSort: 'responseTeamId,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':responseTeamId/view',
    component: ResponseTeamDetailComponent,
    resolve: {
      responseTeam: ResponseTeamRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ResponseTeamUpdateComponent,
    resolve: {
      responseTeam: ResponseTeamRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':responseTeamId/edit',
    component: ResponseTeamUpdateComponent,
    resolve: {
      responseTeam: ResponseTeamRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(responseTeamRoute)],
  exports: [RouterModule],
})
export class ResponseTeamRoutingModule {}
