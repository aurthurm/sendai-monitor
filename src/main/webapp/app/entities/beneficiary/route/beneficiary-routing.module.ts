import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { BeneficiaryComponent } from '../list/beneficiary.component';
import { BeneficiaryDetailComponent } from '../detail/beneficiary-detail.component';
import { BeneficiaryUpdateComponent } from '../update/beneficiary-update.component';
import { BeneficiaryRoutingResolveService } from './beneficiary-routing-resolve.service';

const beneficiaryRoute: Routes = [
  {
    path: '',
    component: BeneficiaryComponent,
    data: {
      defaultSort: 'beneficiaryId,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':beneficiaryId/view',
    component: BeneficiaryDetailComponent,
    resolve: {
      beneficiary: BeneficiaryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BeneficiaryUpdateComponent,
    resolve: {
      beneficiary: BeneficiaryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':beneficiaryId/edit',
    component: BeneficiaryUpdateComponent,
    resolve: {
      beneficiary: BeneficiaryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(beneficiaryRoute)],
  exports: [RouterModule],
})
export class BeneficiaryRoutingModule {}
