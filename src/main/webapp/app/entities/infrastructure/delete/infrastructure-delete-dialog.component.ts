import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IInfrastructure } from '../infrastructure.model';
import { InfrastructureService } from '../service/infrastructure.service';

@Component({
  templateUrl: './infrastructure-delete-dialog.component.html',
})
export class InfrastructureDeleteDialogComponent {
  infrastructure?: IInfrastructure;

  constructor(protected infrastructureService: InfrastructureService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.infrastructureService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
