import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IResponseTeam } from '../response-team.model';
import { ResponseTeamService } from '../service/response-team.service';

@Component({
  templateUrl: './response-team-delete-dialog.component.html',
})
export class ResponseTeamDeleteDialogComponent {
  responseTeam?: IResponseTeam;

  constructor(protected responseTeamService: ResponseTeamService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.responseTeamService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
