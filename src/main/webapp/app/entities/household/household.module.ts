import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { HouseholdComponent } from './list/household.component';
import { HouseholdDetailComponent } from './detail/household-detail.component';
import { HouseholdUpdateComponent } from './update/household-update.component';
import { HouseholdCompactComponent } from './compact/household-compact.component';
import { HouseholdDeleteDialogComponent } from './delete/household-delete-dialog.component';
import { HouseholdRoutingModule } from './route/household-routing.module';

@NgModule({
  imports: [SharedModule, HouseholdRoutingModule],
  declarations: [
    HouseholdComponent,
    HouseholdDetailComponent,
    HouseholdUpdateComponent,
    HouseholdCompactComponent,
    HouseholdDeleteDialogComponent,
  ],
  entryComponents: [HouseholdDeleteDialogComponent],
  exports: [HouseholdCompactComponent, HouseholdUpdateComponent]
})
export class HouseholdModule {}


export { HouseholdCompactComponent, HouseholdUpdateComponent }