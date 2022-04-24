import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { InfrastructureComponent } from './list/infrastructure.component';
import { InfrastructureDetailComponent } from './detail/infrastructure-detail.component';
import { InfrastructureUpdateComponent } from './update/infrastructure-update.component';
import { InfrastructureCompactComponent } from './compact/infrastructure-compact.component';
import { InfrastructureDeleteDialogComponent } from './delete/infrastructure-delete-dialog.component';
import { InfrastructureRoutingModule } from './route/infrastructure-routing.module';

@NgModule({
  imports: [SharedModule, InfrastructureRoutingModule],
  declarations: [
    InfrastructureComponent,
    InfrastructureDetailComponent,
    InfrastructureUpdateComponent,
    InfrastructureCompactComponent,
    InfrastructureDeleteDialogComponent,
  ],
  entryComponents: [InfrastructureDeleteDialogComponent],
  exports: [InfrastructureCompactComponent, InfrastructureUpdateComponent]
})
export class InfrastructureModule {}


export { InfrastructureCompactComponent, InfrastructureUpdateComponent }