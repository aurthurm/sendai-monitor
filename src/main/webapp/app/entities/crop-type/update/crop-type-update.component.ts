import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICropType, CropType } from '../crop-type.model';
import { CropTypeService } from '../service/crop-type.service';

@Component({
  selector: 'jhi-crop-type-update',
  templateUrl: './crop-type-update.component.html',
})
export class CropTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    cropTypeId: [],
    name: [],
  });

  constructor(protected cropTypeService: CropTypeService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cropType }) => {
      this.updateForm(cropType);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cropType = this.createFromForm();
    if (cropType.cropTypeId !== undefined) {
      this.subscribeToSaveResponse(this.cropTypeService.update(cropType));
    } else {
      this.subscribeToSaveResponse(this.cropTypeService.create(cropType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICropType>>): void {
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

  protected updateForm(cropType: ICropType): void {
    this.editForm.patchValue({
      cropTypeId: cropType.cropTypeId,
      name: cropType.name,
    });
  }

  protected createFromForm(): ICropType {
    return {
      ...new CropType(),
      cropTypeId: this.editForm.get(['cropTypeId'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }
}
