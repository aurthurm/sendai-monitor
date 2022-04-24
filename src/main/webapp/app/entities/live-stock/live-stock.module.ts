import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { LiveStockComponent } from './list/live-stock.component';
import { LiveStockDetailComponent } from './detail/live-stock-detail.component';
import { LiveStockUpdateComponent } from './update/live-stock-update.component';
import { LiveStockCompactComponent } from './compact/live-stock-compact.component';
import { LiveStockDeleteDialogComponent } from './delete/live-stock-delete-dialog.component';
import { LiveStockRoutingModule } from './route/live-stock-routing.module';

@NgModule({
  imports: [SharedModule, LiveStockRoutingModule],
  declarations: [
    LiveStockComponent, 
    LiveStockDetailComponent, 
    LiveStockUpdateComponent, 
    LiveStockDeleteDialogComponent, 
    LiveStockCompactComponent
  ],
  entryComponents: [LiveStockDeleteDialogComponent],
  exports: [LiveStockCompactComponent, LiveStockUpdateComponent]
})
export class LiveStockModule {}

export { LiveStockCompactComponent, LiveStockUpdateComponent }
