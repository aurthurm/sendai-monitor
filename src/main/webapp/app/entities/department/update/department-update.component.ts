import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDepartment, Department } from '../department.model';
import { DepartmentService } from '../service/department.service';

@Component({
  selector: 'jhi-department-update',
  templateUrl: './department-update.component.html',
})
export class DepartmentUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    departmentId: [],
    name: [],
    verification: [],
  });

  constructor(protected departmentService: DepartmentService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ department }) => {
      this.updateForm(department);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const department = this.createFromForm();
    if (department.departmentId !== undefined) {
      this.subscribeToSaveResponse(this.departmentService.update(department));
    } else {
      this.subscribeToSaveResponse(this.departmentService.create(department));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepartment>>): void {
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

  protected updateForm(department: IDepartment): void {
    this.editForm.patchValue({
      departmentId: department.departmentId,
      name: department.name,
      verification: department.verification,
    });
  }

  protected createFromForm(): IDepartment {
    return {
      ...new Department(),
      departmentId: this.editForm.get(['departmentId'])!.value,
      name: this.editForm.get(['name'])!.value,
      verification: this.editForm.get(['verification'])!.value,
    };
  }
}
