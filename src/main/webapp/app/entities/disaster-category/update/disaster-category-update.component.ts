import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDisasterCategory, DisasterCategory } from '../disaster-category.model';
import { DisasterCategoryService } from '../service/disaster-category.service';

@Component({
  selector: 'jhi-disaster-category-update',
  templateUrl: './disaster-category-update.component.html',
})
export class DisasterCategoryUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    disasterCategoryId: [],
    name: [],
  });

  constructor(
    protected disasterCategoryService: DisasterCategoryService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ disasterCategory }) => {
      this.updateForm(disasterCategory);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const disasterCategory = this.createFromForm();
    if (disasterCategory.disasterCategoryId !== undefined) {
      this.subscribeToSaveResponse(this.disasterCategoryService.update(disasterCategory));
    } else {
      this.subscribeToSaveResponse(this.disasterCategoryService.create(disasterCategory));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDisasterCategory>>): void {
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

  protected updateForm(disasterCategory: IDisasterCategory): void {
    this.editForm.patchValue({
      disasterCategoryId: disasterCategory.disasterCategoryId,
      name: disasterCategory.name,
    });
  }

  protected createFromForm(): IDisasterCategory {
    return {
      ...new DisasterCategory(),
      disasterCategoryId: this.editForm.get(['disasterCategoryId'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }
}
