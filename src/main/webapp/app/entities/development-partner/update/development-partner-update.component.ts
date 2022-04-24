import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDevelopmentPartner, DevelopmentPartner } from '../development-partner.model';
import { DevelopmentPartnerService } from '../service/development-partner.service';

@Component({
  selector: 'jhi-development-partner-update',
  templateUrl: './development-partner-update.component.html',
})
export class DevelopmentPartnerUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    partnerId: [],
    name: [],
    description: [],
  });

  constructor(
    protected developmentPartnerService: DevelopmentPartnerService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ developmentPartner }) => {
      this.updateForm(developmentPartner);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const developmentPartner = this.createFromForm();
    if (developmentPartner.partnerId !== undefined) {
      this.subscribeToSaveResponse(this.developmentPartnerService.update(developmentPartner));
    } else {
      this.subscribeToSaveResponse(this.developmentPartnerService.create(developmentPartner));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDevelopmentPartner>>): void {
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

  protected updateForm(developmentPartner: IDevelopmentPartner): void {
    this.editForm.patchValue({
      partnerId: developmentPartner.partnerId,
      name: developmentPartner.name,
      description: developmentPartner.description,
    });
  }

  protected createFromForm(): IDevelopmentPartner {
    return {
      ...new DevelopmentPartner(),
      partnerId: this.editForm.get(['partnerId'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }
}
