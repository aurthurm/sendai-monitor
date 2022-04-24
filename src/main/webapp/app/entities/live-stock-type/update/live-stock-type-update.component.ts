import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ILiveStockType, LiveStockType } from '../live-stock-type.model';
import { LiveStockTypeService } from '../service/live-stock-type.service';

@Component({
  selector: 'jhi-live-stock-type-update',
  templateUrl: './live-stock-type-update.component.html',
})
export class LiveStockTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    liveStockTypeId: [],
    name: [],
  });

  constructor(protected liveStockTypeService: LiveStockTypeService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ liveStockType }) => {
      this.updateForm(liveStockType);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const liveStockType = this.createFromForm();
    if (liveStockType.liveStockTypeId !== undefined) {
      this.subscribeToSaveResponse(this.liveStockTypeService.update(liveStockType));
    } else {
      this.subscribeToSaveResponse(this.liveStockTypeService.create(liveStockType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILiveStockType>>): void {
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

  protected updateForm(liveStockType: ILiveStockType): void {
    this.editForm.patchValue({
      liveStockTypeId: liveStockType.liveStockTypeId,
      name: liveStockType.name,
    });
  }

  protected createFromForm(): ILiveStockType {
    return {
      ...new LiveStockType(),
      liveStockTypeId: this.editForm.get(['liveStockTypeId'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }
}
