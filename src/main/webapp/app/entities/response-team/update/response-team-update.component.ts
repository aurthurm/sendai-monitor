import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IResponseTeam, ResponseTeam } from '../response-team.model';
import { ResponseTeamService } from '../service/response-team.service';

@Component({
  selector: 'jhi-response-team-update',
  templateUrl: './response-team-update.component.html',
})
export class ResponseTeamUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    responseTeamId: [],
    disasterId: [],
    name: [],
    teamLead: [],
  });

  constructor(protected responseTeamService: ResponseTeamService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ responseTeam }) => {
      this.updateForm(responseTeam);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const responseTeam = this.createFromForm();
    if (responseTeam.responseTeamId !== undefined) {
      this.subscribeToSaveResponse(this.responseTeamService.update(responseTeam));
    } else {
      this.subscribeToSaveResponse(this.responseTeamService.create(responseTeam));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IResponseTeam>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(responseTeam: IResponseTeam): void {
    this.editForm.patchValue({
      responseTeamId: responseTeam.responseTeamId,
      disasterId: responseTeam.disasterId,
      name: responseTeam.name,
      teamLead: responseTeam.teamLead,
    });
  }

  protected createFromForm(): IResponseTeam {
    return {
      ...new ResponseTeam(),
      responseTeamId: this.editForm.get(['responseTeamId'])!.value,
      disasterId: this.editForm.get(['disasterId'])!.value,
      name: this.editForm.get(['name'])!.value,
      teamLead: this.editForm.get(['teamLead'])!.value,
    };
  }
}
