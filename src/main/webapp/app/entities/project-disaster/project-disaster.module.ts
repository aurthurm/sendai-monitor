import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProjectDisasterComponent } from './list/project-disaster.component';
import { ProjectDisasterDetailComponent } from './detail/project-disaster-detail.component';
import { ProjectDisasterUpdateComponent } from './update/project-disaster-update.component';
import { ProjectDisasterDeleteDialogComponent } from './delete/project-disaster-delete-dialog.component';
import { ProjectDisasterRoutingModule } from './route/project-disaster-routing.module';

@NgModule({
  imports: [SharedModule, ProjectDisasterRoutingModule],
  declarations: [
    ProjectDisasterComponent,
    ProjectDisasterDetailComponent,
    ProjectDisasterUpdateComponent,
    ProjectDisasterDeleteDialogComponent,
  ],
  entryComponents: [ProjectDisasterDeleteDialogComponent],
})
export class ProjectDisasterModule {}
