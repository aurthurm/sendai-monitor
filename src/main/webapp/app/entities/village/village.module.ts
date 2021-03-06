import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { VillageComponent } from './list/village.component';
import { VillageDetailComponent } from './detail/village-detail.component';
import { VillageUpdateComponent } from './update/village-update.component';
import { VillageDeleteDialogComponent } from './delete/village-delete-dialog.component';
import { VillageRoutingModule } from './route/village-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  imports: [SharedModule, VillageRoutingModule, NgMultiSelectDropDownModule.forRoot()],
  declarations: [VillageComponent, VillageDetailComponent, VillageUpdateComponent, VillageDeleteDialogComponent],
  entryComponents: [VillageDeleteDialogComponent],
})
export class VillageModule {}
