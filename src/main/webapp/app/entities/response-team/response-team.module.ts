import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ResponseTeamComponent } from './list/response-team.component';
import { ResponseTeamDetailComponent } from './detail/response-team-detail.component';
import { ResponseTeamUpdateComponent } from './update/response-team-update.component';
import { ResponseTeamDeleteDialogComponent } from './delete/response-team-delete-dialog.component';
import { ResponseTeamRoutingModule } from './route/response-team-routing.module';

@NgModule({
  imports: [SharedModule, ResponseTeamRoutingModule],
  declarations: [ResponseTeamComponent, ResponseTeamDetailComponent, ResponseTeamUpdateComponent, ResponseTeamDeleteDialogComponent],
  entryComponents: [ResponseTeamDeleteDialogComponent],
})
export class ResponseTeamModule {}
