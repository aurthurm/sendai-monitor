import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDisaster } from '../disaster.model';
import { DisasterService } from '../service/disaster.service';

@Component({
  templateUrl: './disaster-delete-dialog.component.html',
})
export class DisasterDeleteDialogComponent {
  disaster?: IDisaster;

  constructor(protected disasterService: DisasterService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.disasterService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
