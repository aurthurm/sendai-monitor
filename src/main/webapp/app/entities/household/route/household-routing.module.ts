import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { HouseholdComponent } from '../list/household.component';
import { HouseholdDetailComponent } from '../detail/household-detail.component';
import { HouseholdUpdateComponent } from '../update/household-update.component';
import { HouseholdRoutingResolveService } from './household-routing-resolve.service';

const householdRoute: Routes = [
  {
    path: '',
    component: HouseholdComponent,
    data: {
      defaultSort: 'householdId,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':householdId/view',
    component: HouseholdDetailComponent,
    resolve: {
      household: HouseholdRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HouseholdUpdateComponent,
    resolve: {
      household: HouseholdRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':householdId/edit',
    component: HouseholdUpdateComponent,
    resolve: {
      household: HouseholdRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(householdRoute)],
  exports: [RouterModule],
})
export class HouseholdRoutingModule {}
