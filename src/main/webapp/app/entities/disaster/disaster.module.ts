import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DisasterComponent } from './list/disaster.component';
import { DisasterDetailComponent } from './detail/disaster-detail.component';
import { DisasterUpdateComponent } from './update/disaster-update.component';
import { DisasterApprovalComponent } from './approval/disaster-approval.component';
import { DisasterDeleteDialogComponent } from './delete/disaster-delete-dialog.component';
import { DisasterRoutingModule } from './route/disaster-routing.module';
import { CasualtyModule } from 'app/entities/casualty/casualty.module';
import { FileDataModule } from 'app/entities/file-data/file-data.module';
import { CropModule } from 'app/entities/crop/crop.module';
import { InfrastructureModule } from 'app/entities/infrastructure/infrastructure.module';
import { LiveStockModule } from 'app/entities/live-stock/live-stock.module';
import { HumanPopulationModule } from 'app/entities/human-population/human-population.module';
import { HouseholdModule } from 'app/entities/household/household.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  imports: [
    SharedModule, 
    DisasterRoutingModule, 
    CasualtyModule, 
    FileDataModule, 
    CropModule,
    InfrastructureModule,
    LiveStockModule,
    HumanPopulationModule,
    HouseholdModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [DisasterComponent, DisasterApprovalComponent, DisasterDetailComponent, DisasterUpdateComponent, DisasterDeleteDialogComponent],
  exports: [DisasterApprovalComponent],
  entryComponents: [DisasterDeleteDialogComponent, ],
})
export class DisasterModule {}