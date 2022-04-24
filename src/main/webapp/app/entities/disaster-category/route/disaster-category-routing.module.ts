import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DisasterCategoryComponent } from '../list/disaster-category.component';
import { DisasterCategoryDetailComponent } from '../detail/disaster-category-detail.component';
import { DisasterCategoryUpdateComponent } from '../update/disaster-category-update.component';
import { DisasterCategoryRoutingResolveService } from './disaster-category-routing-resolve.service';

const disasterCategoryRoute: Routes = [
  {
    path: '',
    component: DisasterCategoryComponent,
    data: {
      defaultSort: 'disasterCategoryId,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':disasterCategoryId/view',
    component: DisasterCategoryDetailComponent,
    resolve: {
      disasterCategory: DisasterCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DisasterCategoryUpdateComponent,
    resolve: {
      disasterCategory: DisasterCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':disasterCategoryId/edit',
    component: DisasterCategoryUpdateComponent,
    resolve: {
      disasterCategory: DisasterCategoryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(disasterCategoryRoute)],
  exports: [RouterModule],
})
export class DisasterCategoryRoutingModule {}
