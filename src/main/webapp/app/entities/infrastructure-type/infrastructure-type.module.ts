import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { InfrastructureTypeComponent } from './list/infrastructure-type.component';
import { InfrastructureTypeDetailComponent } from './detail/infrastructure-type-detail.component';
import { InfrastructureTypeUpdateComponent } from './update/infrastructure-type-update.component';
import { InfrastructureTypeDeleteDialogComponent } from './delete/infrastructure-type-delete-dialog.component';
import { InfrastructureTypeRoutingModule } from './route/infrastructure-type-routing.module';

@NgModule({
  imports: [SharedModule, InfrastructureTypeRoutingModule],
  declarations: [
    InfrastructureTypeComponent,
    InfrastructureTypeDetailComponent,
    InfrastructureTypeUpdateComponent,
    InfrastructureTypeDeleteDialogComponent,
  ],
  entryComponents: [InfrastructureTypeDeleteDialogComponent],
})
export class InfrastructureTypeModule {}
