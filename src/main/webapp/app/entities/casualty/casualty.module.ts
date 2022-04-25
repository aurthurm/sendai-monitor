import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CasualtyComponent } from './list/casualty.component';
import { CasualtyCompactComponent } from './compact/casualty-compact.component';
import { CasualtyDetailComponent } from './detail/casualty-detail.component';
import { CasualtyUploadComponent } from './upload/casualty-upload.component';
import { CasualtyUpdateComponent } from './update/casualty-update.component';
import { CasualtyDeleteDialogComponent } from './delete/casualty-delete-dialog.component';
import { CasualtyRoutingModule } from './route/casualty-routing.module';

@NgModule({
  imports: [SharedModule, CasualtyRoutingModule],
  declarations: [CasualtyComponent,CasualtyCompactComponent, CasualtyUploadComponent, CasualtyDetailComponent, CasualtyUpdateComponent, CasualtyDeleteDialogComponent],
  entryComponents: [CasualtyDeleteDialogComponent],
  exports: [CasualtyCompactComponent] 
})
export class CasualtyModule {}

export { CasualtyComponent };
