import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPartnerIntervention } from '../partner-intervention.model';
import { PartnerInterventionService } from '../service/partner-intervention.service';

@Component({
  templateUrl: './partner-intervention-delete-dialog.component.html',
})
export class PartnerInterventionDeleteDialogComponent {
  partnerIntervention?: IPartnerIntervention;

  constructor(protected partnerInterventionService: PartnerInterventionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.partnerInterventionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
