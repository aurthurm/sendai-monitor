import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDisasterType } from '../disaster-type.model';
import { DisasterTypeService } from '../service/disaster-type.service';

@Component({
  templateUrl: './disaster-type-delete-dialog.component.html',
})
export class DisasterTypeDeleteDialogComponent {
  disasterType?: IDisasterType;

  constructor(protected disasterTypeService: DisasterTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.disasterTypeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
