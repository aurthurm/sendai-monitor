import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { LiveStockTypeComponent } from './list/live-stock-type.component';
import { LiveStockTypeDetailComponent } from './detail/live-stock-type-detail.component';
import { LiveStockTypeUpdateComponent } from './update/live-stock-type-update.component';
import { LiveStockTypeDeleteDialogComponent } from './delete/live-stock-type-delete-dialog.component';
import { LiveStockTypeRoutingModule } from './route/live-stock-type-routing.module';

@NgModule({
  imports: [SharedModule, LiveStockTypeRoutingModule],
  declarations: [LiveStockTypeComponent, LiveStockTypeDetailComponent, LiveStockTypeUpdateComponent, LiveStockTypeDeleteDialogComponent],
  entryComponents: [LiveStockTypeDeleteDialogComponent],
})
export class LiveStockTypeModule {}
