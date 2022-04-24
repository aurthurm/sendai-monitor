import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CropTypeComponent } from './list/crop-type.component';
import { CropTypeDetailComponent } from './detail/crop-type-detail.component';
import { CropTypeUpdateComponent } from './update/crop-type-update.component';
import { CropTypeDeleteDialogComponent } from './delete/crop-type-delete-dialog.component';
import { CropTypeRoutingModule } from './route/crop-type-routing.module';

@NgModule({
  imports: [SharedModule, CropTypeRoutingModule],
  declarations: [CropTypeComponent, CropTypeDetailComponent, CropTypeUpdateComponent, CropTypeDeleteDialogComponent],
  entryComponents: [CropTypeDeleteDialogComponent],
})
export class CropTypeModule {}
