import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IBeneficiary, Beneficiary } from '../beneficiary.model';
import { BeneficiaryService } from '../service/beneficiary.service';

@Component({
  selector: 'jhi-beneficiary-update',
  templateUrl: './beneficiary-update.component.html',
})
export class BeneficiaryUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    beneficiaryId: [],
    projectId: [],
    amountReceived: [],
    valueOfGoodsReceived: [],
  });

  constructor(protected beneficiaryService: BeneficiaryService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ beneficiary }) => {
      this.updateForm(beneficiary);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const beneficiary = this.createFromForm();
    if (beneficiary.beneficiaryId !== undefined) {
      this.subscribeToSaveResponse(this.beneficiaryService.update(beneficiary));
    } else {
      this.subscribeToSaveResponse(this.beneficiaryService.create(beneficiary));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBeneficiary>>): void {
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

  protected updateForm(beneficiary: IBeneficiary): void {
    this.editForm.patchValue({
      beneficiaryId: beneficiary.beneficiaryId,
      projectId: beneficiary.projectId,
      amountReceived: beneficiary.amountReceived,
      valueOfGoodsReceived: beneficiary.valueOfGoodsReceived,
    });
  }

  protected createFromForm(): IBeneficiary {
    return {
      ...new Beneficiary(),
      beneficiaryId: this.editForm.get(['beneficiaryId'])!.value,
      projectId: this.editForm.get(['projectId'])!.value,
      amountReceived: this.editForm.get(['amountReceived'])!.value,
      valueOfGoodsReceived: this.editForm.get(['valueOfGoodsReceived'])!.value,
    };
  }
}
