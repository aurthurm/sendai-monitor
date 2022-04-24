import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PartnerInterventionComponent } from '../list/partner-intervention.component';
import { PartnerInterventionDetailComponent } from '../detail/partner-intervention-detail.component';
import { PartnerInterventionUpdateComponent } from '../update/partner-intervention-update.component';
import { PartnerInterventionRoutingResolveService } from './partner-intervention-routing-resolve.service';

const partnerInterventionRoute: Routes = [
  {
    path: '',
    component: PartnerInterventionComponent,
    data: {
      defaultSort: 'inteventionId,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':inteventionId/view',
    component: PartnerInterventionDetailComponent,
    resolve: {
      partnerIntervention: PartnerInterventionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PartnerInterventionUpdateComponent,
    resolve: {
      partnerIntervention: PartnerInterventionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':inteventionId/edit',
    component: PartnerInterventionUpdateComponent,
    resolve: {
      partnerIntervention: PartnerInterventionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(partnerInterventionRoute)],
  exports: [RouterModule],
})
export class PartnerInterventionRoutingModule {}
