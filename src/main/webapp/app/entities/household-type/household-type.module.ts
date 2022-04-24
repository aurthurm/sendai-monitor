import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { HouseholdTypeComponent } from './list/household-type.component';
import { HouseholdTypeDetailComponent } from './detail/household-type-detail.component';
import { HouseholdTypeUpdateComponent } from './update/household-type-update.component';
import { HouseholdTypeDeleteDialogComponent } from './delete/household-type-delete-dialog.component';
import { HouseholdTypeRoutingModule } from './route/household-type-routing.module';

@NgModule({
  imports: [SharedModule, HouseholdTypeRoutingModule],
  declarations: [HouseholdTypeComponent, HouseholdTypeDetailComponent, HouseholdTypeUpdateComponent, HouseholdTypeDeleteDialogComponent],
  entryComponents: [HouseholdTypeDeleteDialogComponent],
})
export class HouseholdTypeModule {}
