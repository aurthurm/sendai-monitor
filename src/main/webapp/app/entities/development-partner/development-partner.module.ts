import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DevelopmentPartnerComponent } from './list/development-partner.component';
import { DevelopmentPartnerDetailComponent } from './detail/development-partner-detail.component';
import { DevelopmentPartnerUpdateComponent } from './update/development-partner-update.component';
import { DevelopmentPartnerDeleteDialogComponent } from './delete/development-partner-delete-dialog.component';
import { DevelopmentPartnerRoutingModule } from './route/development-partner-routing.module';

@NgModule({
  imports: [SharedModule, DevelopmentPartnerRoutingModule],
  declarations: [
    DevelopmentPartnerComponent,
    DevelopmentPartnerDetailComponent,
    DevelopmentPartnerUpdateComponent,
    DevelopmentPartnerDeleteDialogComponent,
  ],
  entryComponents: [DevelopmentPartnerDeleteDialogComponent],
})
export class DevelopmentPartnerModule {}
