import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IInfrastructureType } from '../infrastructure-type.model';
import { InfrastructureTypeService } from '../service/infrastructure-type.service';

@Component({
  templateUrl: './infrastructure-type-delete-dialog.component.html',
})
export class InfrastructureTypeDeleteDialogComponent {
  infrastructureType?: IInfrastructureType;

  constructor(protected infrastructureTypeService: InfrastructureTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.infrastructureTypeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
