import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProjectDisasterComponent } from '../list/project-disaster.component';
import { ProjectDisasterDetailComponent } from '../detail/project-disaster-detail.component';
import { ProjectDisasterUpdateComponent } from '../update/project-disaster-update.component';
import { ProjectDisasterRoutingResolveService } from './project-disaster-routing-resolve.service';

const projectDisasterRoute: Routes = [
  {
    path: '',
    component: ProjectDisasterComponent,
    data: {
      defaultSort: 'projectDisasterId,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':projectDisasterId/view',
    component: ProjectDisasterDetailComponent,
    resolve: {
      projectDisaster: ProjectDisasterRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProjectDisasterUpdateComponent,
    resolve: {
      projectDisaster: ProjectDisasterRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':projectDisasterId/edit',
    component: ProjectDisasterUpdateComponent,
    resolve: {
      projectDisaster: ProjectDisasterRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(projectDisasterRoute)],
  exports: [RouterModule],
})
export class ProjectDisasterRoutingModule {}
