import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { dashBoardRoute } from './dashboard';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(dashBoardRoute)],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
