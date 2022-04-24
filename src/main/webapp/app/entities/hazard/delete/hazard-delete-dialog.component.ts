import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IHazard } from '../hazard.model';
import { HazardService } from '../service/hazard.service';

@Component({
  templateUrl: './hazard-delete-dialog.component.html',
})
export class HazardDeleteDialogComponent {
  hazard?: IHazard;

  constructor(protected hazardService: HazardService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.hazardService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
