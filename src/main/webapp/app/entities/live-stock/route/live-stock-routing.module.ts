import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { LiveStockComponent } from '../list/live-stock.component';
import { LiveStockDetailComponent } from '../detail/live-stock-detail.component';
import { LiveStockUpdateComponent } from '../update/live-stock-update.component';
import { LiveStockRoutingResolveService } from './live-stock-routing-resolve.service';

const liveStockRoute: Routes = [
  {
    path: '',
    component: LiveStockComponent,
    data: {
      defaultSort: 'liveStockId,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':liveStockId/view',
    component: LiveStockDetailComponent,
    resolve: {
      liveStock: LiveStockRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LiveStockUpdateComponent,
    resolve: {
      liveStock: LiveStockRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':liveStockId/edit',
    component: LiveStockUpdateComponent,
    resolve: {
      liveStock: LiveStockRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(liveStockRoute)],
  exports: [RouterModule],
})
export class LiveStockRoutingModule {}
