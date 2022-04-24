import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IInfrastructureType, InfrastructureType } from '../infrastructure-type.model';
import { InfrastructureTypeService } from '../service/infrastructure-type.service';

@Component({
  selector: 'jhi-infrastructure-type-update',
  templateUrl: './infrastructure-type-update.component.html',
})
export class InfrastructureTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    infractructureTypeId: [],
    name: [],
  });

  constructor(
    protected infrastructureTypeService: InfrastructureTypeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ infrastructureType }) => {
      this.updateForm(infrastructureType);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const infrastructureType = this.createFromForm();
    if (infrastructureType.infractructureTypeId !== undefined) {
      this.subscribeToSaveResponse(this.infrastructureTypeService.update(infrastructureType));
    } else {
      this.subscribeToSaveResponse(this.infrastructureTypeService.create(infrastructureType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInfrastructureType>>): void {
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

  protected updateForm(infrastructureType: IInfrastructureType): void {
    this.editForm.patchValue({
      infractructureTypeId: infrastructureType.infractructureTypeId,
      name: infrastructureType.name,
    });
  }

  protected createFromForm(): IInfrastructureType {
    return {
      ...new InfrastructureType(),
      infractructureTypeId: this.editForm.get(['infractructureTypeId'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }
}
