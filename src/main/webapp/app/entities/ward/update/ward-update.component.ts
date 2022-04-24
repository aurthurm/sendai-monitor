import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IWard, Ward } from '../ward.model';
import { WardService } from '../service/ward.service';

@Component({
  selector: 'jhi-ward-update',
  templateUrl: './ward-update.component.html',
})
export class WardUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    wardId: [],
    districtId: [],
    name: [],
    latitude: [],
    longitude: [],
    level: [],
  });

  constructor(protected wardService: WardService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ward }) => {
      this.updateForm(ward);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ward = this.createFromForm();
    if (ward.wardId !== undefined) {
      this.subscribeToSaveResponse(this.wardService.update(ward));
    } else {
      this.subscribeToSaveResponse(this.wardService.create(ward));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWard>>): void {
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

  protected updateForm(ward: IWard): void {
    this.editForm.patchValue({
      wardId: ward.wardId,
      districtId: ward.districtId,
      name: ward.name,
      latitude: ward.latitude,
      longitude: ward.longitude,
      level: ward.level,
    });
  }

  protected createFromForm(): IWard {
    return {
      ...new Ward(),
      wardId: this.editForm.get(['wardId'])!.value,
      districtId: this.editForm.get(['districtId'])!.value,
      name: this.editForm.get(['name'])!.value,
      latitude: this.editForm.get(['latitude'])!.value,
      longitude: this.editForm.get(['longitude'])!.value,
      level: this.editForm.get(['level'])!.value,
    };
  }
}
