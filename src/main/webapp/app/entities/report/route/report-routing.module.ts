import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ReportDetailComponent } from '../detail/report-detail.component';
import { ReportRoutingResolveService } from './address-routing-resolve.service';

const reportRoute: Routes = [
  {
    path: '',
    component: ReportDetailComponent,
    resolve: {
      report: ReportRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },

];

@NgModule({
  imports: [RouterModule.forChild(reportRoute)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
