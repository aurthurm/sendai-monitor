import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPartnerIntervention, PartnerIntervention } from '../partner-intervention.model';
import { PartnerInterventionService } from '../service/partner-intervention.service';

@Component({
  selector: 'jhi-partner-intervention-update',
  templateUrl: './partner-intervention-update.component.html',
})
export class PartnerInterventionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    inteventionId: [],
    partnerId: [],
    disasterId: [],
    projectId: [],
    hazardId: [],
    amountReceived: [],
    assistanceOffered: [],
  });

  constructor(
    protected partnerInterventionService: PartnerInterventionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ partnerIntervention }) => {
      this.updateForm(partnerIntervention);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const partnerIntervention = this.createFromForm();
    if (partnerIntervention.inteventionId !== undefined) {
      this.subscribeToSaveResponse(this.partnerInterventionService.update(partnerIntervention));
    } else {
      this.subscribeToSaveResponse(this.partnerInterventionService.create(partnerIntervention));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPartnerIntervention>>): void {
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

  protected updateForm(partnerIntervention: IPartnerIntervention): void {
    this.editForm.patchValue({
      inteventionId: partnerIntervention.inteventionId,
      partnerId: partnerIntervention.partnerId,
      disasterId: partnerIntervention.disasterId,
      projectId: partnerIntervention.projectId,
      hazardId: partnerIntervention.hazardId,
      amountReceived: partnerIntervention.amountReceived,
      assistanceOffered: partnerIntervention.assistanceOffered,
    });
  }

  protected createFromForm(): IPartnerIntervention {
    return {
      ...new PartnerIntervention(),
      inteventionId: this.editForm.get(['inteventionId'])!.value,
      partnerId: this.editForm.get(['partnerId'])!.value,
      disasterId: this.editForm.get(['disasterId'])!.value,
      projectId: this.editForm.get(['projectId'])!.value,
      hazardId: this.editForm.get(['hazardId'])!.value,
      amountReceived: this.editForm.get(['amountReceived'])!.value,
      assistanceOffered: this.editForm.get(['assistanceOffered'])!.value,
    };
  }
}
