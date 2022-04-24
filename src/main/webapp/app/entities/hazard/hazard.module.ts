import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { HazardComponent } from './list/hazard.component';
import { HazardDetailComponent } from './detail/hazard-detail.component';
import { HazardUpdateComponent } from './update/hazard-update.component';
import { HazardDeleteDialogComponent } from './delete/hazard-delete-dialog.component';
import { HazardRoutingModule } from './route/hazard-routing.module';

@NgModule({
  imports: [SharedModule, HazardRoutingModule],
  declarations: [HazardComponent, HazardDetailComponent, HazardUpdateComponent, HazardDeleteDialogComponent],
  entryComponents: [HazardDeleteDialogComponent],
})
export class HazardModule {}
