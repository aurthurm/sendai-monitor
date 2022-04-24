import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ILiveStockType } from '../live-stock-type.model';
import { LiveStockTypeService } from '../service/live-stock-type.service';

@Component({
  templateUrl: './live-stock-type-delete-dialog.component.html',
})
export class LiveStockTypeDeleteDialogComponent {
  liveStockType?: ILiveStockType;

  constructor(protected liveStockTypeService: LiveStockTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.liveStockTypeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
