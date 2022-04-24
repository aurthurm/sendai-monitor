import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ILiveStock } from '../live-stock.model';
import { LiveStockService } from '../service/live-stock.service';

@Component({
  templateUrl: './live-stock-delete-dialog.component.html',
})
export class LiveStockDeleteDialogComponent {
  liveStock?: ILiveStock;

  constructor(protected liveStockService: LiveStockService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.liveStockService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
