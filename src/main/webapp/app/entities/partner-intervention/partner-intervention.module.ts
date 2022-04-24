import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PartnerInterventionComponent } from './list/partner-intervention.component';
import { PartnerInterventionDetailComponent } from './detail/partner-intervention-detail.component';
import { PartnerInterventionUpdateComponent } from './update/partner-intervention-update.component';
import { PartnerInterventionDeleteDialogComponent } from './delete/partner-intervention-delete-dialog.component';
import { PartnerInterventionRoutingModule } from './route/partner-intervention-routing.module';

@NgModule({
  imports: [SharedModule, PartnerInterventionRoutingModule],
  declarations: [
    PartnerInterventionComponent,
    PartnerInterventionDetailComponent,
    PartnerInterventionUpdateComponent,
    PartnerInterventionDeleteDialogComponent,
  ],
  entryComponents: [PartnerInterventionDeleteDialogComponent],
})
export class PartnerInterventionModule {}
