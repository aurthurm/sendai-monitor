import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { HouseholdTypeComponent } from '../list/household-type.component';
import { HouseholdTypeDetailComponent } from '../detail/household-type-detail.component';
import { HouseholdTypeUpdateComponent } from '../update/household-type-update.component';
import { HouseholdTypeRoutingResolveService } from './household-type-routing-resolve.service';

const householdTypeRoute: Routes = [
  {
    path: '',
    component: HouseholdTypeComponent,
    data: {
      defaultSort: 'householdTypeId,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':householdTypeId/view',
    component: HouseholdTypeDetailComponent,
    resolve: {
      householdType: HouseholdTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HouseholdTypeUpdateComponent,
    resolve: {
      householdType: HouseholdTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':householdTypeId/edit',
    component: HouseholdTypeUpdateComponent,
    resolve: {
      householdType: HouseholdTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(householdTypeRoute)],
  exports: [RouterModule],
})
export class HouseholdTypeRoutingModule {}
