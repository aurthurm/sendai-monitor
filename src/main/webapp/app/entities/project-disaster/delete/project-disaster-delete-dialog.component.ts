import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProjectDisaster } from '../project-disaster.model';
import { ProjectDisasterService } from '../service/project-disaster.service';

@Component({
  templateUrl: './project-disaster-delete-dialog.component.html',
})
export class ProjectDisasterDeleteDialogComponent {
  projectDisaster?: IProjectDisaster;

  constructor(protected projectDisasterService: ProjectDisasterService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.projectDisasterService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
