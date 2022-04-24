import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICropType } from '../crop-type.model';
import { CropTypeService } from '../service/crop-type.service';

@Component({
  templateUrl: './crop-type-delete-dialog.component.html',
})
export class CropTypeDeleteDialogComponent {
  cropType?: ICropType;

  constructor(protected cropTypeService: CropTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.cropTypeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
