import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { LiveStockTypeComponent } from '../list/live-stock-type.component';
import { LiveStockTypeDetailComponent } from '../detail/live-stock-type-detail.component';
import { LiveStockTypeUpdateComponent } from '../update/live-stock-type-update.component';
import { LiveStockTypeRoutingResolveService } from './live-stock-type-routing-resolve.service';

const liveStockTypeRoute: Routes = [
  {
    path: '',
    component: LiveStockTypeComponent,
    data: {
      defaultSort: 'liveStockTypeId,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':liveStockTypeId/view',
    component: LiveStockTypeDetailComponent,
    resolve: {
      liveStockType: LiveStockTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LiveStockTypeUpdateComponent,
    resolve: {
      liveStockType: LiveStockTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':liveStockTypeId/edit',
    component: LiveStockTypeUpdateComponent,
    resolve: {
      liveStockType: LiveStockTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(liveStockTypeRoute)],
  exports: [RouterModule],
})
export class LiveStockTypeRoutingModule {}
