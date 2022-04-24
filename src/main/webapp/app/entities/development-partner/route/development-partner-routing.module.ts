import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DevelopmentPartnerComponent } from '../list/development-partner.component';
import { DevelopmentPartnerDetailComponent } from '../detail/development-partner-detail.component';
import { DevelopmentPartnerUpdateComponent } from '../update/development-partner-update.component';
import { DevelopmentPartnerRoutingResolveService } from './development-partner-routing-resolve.service';

const developmentPartnerRoute: Routes = [
  {
    path: '',
    component: DevelopmentPartnerComponent,
    data: {
      defaultSort: 'partnerId,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':partnerId/view',
    component: DevelopmentPartnerDetailComponent,
    resolve: {
      developmentPartner: DevelopmentPartnerRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DevelopmentPartnerUpdateComponent,
    resolve: {
      developmentPartner: DevelopmentPartnerRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':partnerId/edit',
    component: DevelopmentPartnerUpdateComponent,
    resolve: {
      developmentPartner: DevelopmentPartnerRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(developmentPartnerRoute)],
  exports: [RouterModule],
})
export class DevelopmentPartnerRoutingModule {}
