import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IHazard, Hazard } from '../hazard.model';
import { HazardService } from '../service/hazard.service';

@Component({
  selector: 'jhi-hazard-update',
  templateUrl: './hazard-update.component.html',
})
export class HazardUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    hazardId: [],
    type: [],
    locationId: [],
    mitigation: [],
    description: [],
    severity: [],
  });

  constructor(protected hazardService: HazardService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hazard }) => {
      this.updateForm(hazard);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const hazard = this.createFromForm();
    if (hazard.hazardId !== undefined) {
      this.subscribeToSaveResponse(this.hazardService.update(hazard));
    } else {
      this.subscribeToSaveResponse(this.hazardService.create(hazard));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHazard>>): void {
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

  protected updateForm(hazard: IHazard): void {
    this.editForm.patchValue({
      hazardId: hazard.hazardId,
      type: hazard.type,
      locationId: hazard.locationId,
      mitigation: hazard.mitigation,
      description: hazard.description,
      severity: hazard.severity,
    });
  }

  protected createFromForm(): IHazard {
    return {
      ...new Hazard(),
      hazardId: this.editForm.get(['hazardId'])!.value,
      type: this.editForm.get(['type'])!.value,
      locationId: this.editForm.get(['locationId'])!.value,
      mitigation: this.editForm.get(['mitigation'])!.value,
      description: this.editForm.get(['description'])!.value,
      severity: this.editForm.get(['severity'])!.value,
    };
  }
}
