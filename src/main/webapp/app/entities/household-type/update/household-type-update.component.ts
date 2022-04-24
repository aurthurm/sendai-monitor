import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IHouseholdType, HouseholdType } from '../household-type.model';
import { HouseholdTypeService } from '../service/household-type.service';

@Component({
  selector: 'jhi-household-type-update',
  templateUrl: './household-type-update.component.html',
})
export class HouseholdTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    householdTypeId: [],
    name: [],
  });

  constructor(protected householdTypeService: HouseholdTypeService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ householdType }) => {
      this.updateForm(householdType);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const householdType = this.createFromForm();
    if (householdType.householdTypeId !== undefined) {
      this.subscribeToSaveResponse(this.householdTypeService.update(householdType));
    } else {
      this.subscribeToSaveResponse(this.householdTypeService.create(householdType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHouseholdType>>): void {
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

  protected updateForm(householdType: IHouseholdType): void {
    this.editForm.patchValue({
      householdTypeId: householdType.householdTypeId,
      name: householdType.name,
    });
  }

  protected createFromForm(): IHouseholdType {
    return {
      ...new HouseholdType(),
      householdTypeId: this.editForm.get(['householdTypeId'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }
}
