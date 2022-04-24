import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDisasterType, DisasterType } from '../disaster-type.model';
import { DisasterTypeService } from '../service/disaster-type.service';

@Component({
  selector: 'jhi-disaster-type-update',
  templateUrl: './disaster-type-update.component.html',
})
export class DisasterTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    disasterTypeId: [],
    disasterCategoryId: [],
    name: [],
  });

  constructor(protected disasterTypeService: DisasterTypeService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ disasterType }) => {
      this.updateForm(disasterType);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const disasterType = this.createFromForm();
    if (disasterType.disasterTypeId !== undefined) {
      this.subscribeToSaveResponse(this.disasterTypeService.update(disasterType));
    } else {
      this.subscribeToSaveResponse(this.disasterTypeService.create(disasterType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDisasterType>>): void {
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

  protected updateForm(disasterType: IDisasterType): void {
    this.editForm.patchValue({
      disasterTypeId: disasterType.disasterTypeId,
      disasterCategoryId: disasterType.disasterCategoryId,
      name: disasterType.name,
    });
  }

  protected createFromForm(): IDisasterType {
    return {
      ...new DisasterType(),
      disasterTypeId: this.editForm.get(['disasterTypeId'])!.value,
      disasterCategoryId: this.editForm.get(['disasterCategoryId'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }
}
