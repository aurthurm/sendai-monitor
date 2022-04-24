import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDisasterCategory } from '../disaster-category.model';
import { DisasterCategoryService } from '../service/disaster-category.service';

@Component({
  templateUrl: './disaster-category-delete-dialog.component.html',
})
export class DisasterCategoryDeleteDialogComponent {
  disasterCategory?: IDisasterCategory;

  constructor(protected disasterCategoryService: DisasterCategoryService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.disasterCategoryService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
