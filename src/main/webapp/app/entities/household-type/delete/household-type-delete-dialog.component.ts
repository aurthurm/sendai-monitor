import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IHouseholdType } from '../household-type.model';
import { HouseholdTypeService } from '../service/household-type.service';

@Component({
  templateUrl: './household-type-delete-dialog.component.html',
})
export class HouseholdTypeDeleteDialogComponent {
  householdType?: IHouseholdType;

  constructor(protected householdTypeService: HouseholdTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.householdTypeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
