import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDevelopmentPartner } from '../development-partner.model';
import { DevelopmentPartnerService } from '../service/development-partner.service';

@Component({
  templateUrl: './development-partner-delete-dialog.component.html',
})
export class DevelopmentPartnerDeleteDialogComponent {
  developmentPartner?: IDevelopmentPartner;

  constructor(protected developmentPartnerService: DevelopmentPartnerService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.developmentPartnerService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
