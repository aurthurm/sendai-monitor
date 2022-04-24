import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICasualty } from '../casualty.model';
import { CasualtyService } from '../service/casualty.service';

@Component({
  templateUrl: './casualty-delete-dialog.component.html',
})
export class CasualtyDeleteDialogComponent {
  casualty?: ICasualty;

  constructor(protected casualtyService: CasualtyService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.casualtyService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
