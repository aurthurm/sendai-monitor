import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CustomReportDetailComponent } from '../detail/custom-report-detail.component';
import { CustomReportRoutingResolveService } from './custom-address-routing-resolve.service';

const reportRoute: Routes = [
  {
    path: '',
    component: CustomReportDetailComponent,
    resolve: {
      customReport: CustomReportRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },

];

@NgModule({
  imports: [RouterModule.forChild(reportRoute)],
  exports: [RouterModule],
})
export class CustomReportRoutingModule {}
