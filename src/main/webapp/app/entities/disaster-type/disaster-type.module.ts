import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DisasterTypeComponent } from './list/disaster-type.component';
import { DisasterTypeDetailComponent } from './detail/disaster-type-detail.component';
import { DisasterTypeUpdateComponent } from './update/disaster-type-update.component';
import { DisasterTypeDeleteDialogComponent } from './delete/disaster-type-delete-dialog.component';
import { DisasterTypeRoutingModule } from './route/disaster-type-routing.module';

@NgModule({
  imports: [SharedModule, DisasterTypeRoutingModule],
  declarations: [DisasterTypeComponent, DisasterTypeDetailComponent, DisasterTypeUpdateComponent, DisasterTypeDeleteDialogComponent],
  entryComponents: [DisasterTypeDeleteDialogComponent],
})
export class DisasterTypeModule {}
