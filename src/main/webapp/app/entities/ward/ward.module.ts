import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { WardComponent } from './list/ward.component';
import { WardDetailComponent } from './detail/ward-detail.component';
import { WardUpdateComponent } from './update/ward-update.component';
import { WardDeleteDialogComponent } from './delete/ward-delete-dialog.component';
import { WardRoutingModule } from './route/ward-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [SharedModule, WardRoutingModule, NgMultiSelectDropDownModule.forRoot()],
  declarations: [WardComponent, WardDetailComponent, WardUpdateComponent, WardDeleteDialogComponent],
  entryComponents: [WardDeleteDialogComponent],
  
})
export class WardModule {}
