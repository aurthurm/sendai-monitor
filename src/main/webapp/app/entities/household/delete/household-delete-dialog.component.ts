import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IHousehold } from '../household.model';
import { HouseholdService } from '../service/household.service';

@Component({
  templateUrl: './household-delete-dialog.component.html',
})
export class HouseholdDeleteDialogComponent {
  household?: IHousehold;

  constructor(protected householdService: HouseholdService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.householdService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
