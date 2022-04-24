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
    phoneNumber: [],
    countryId: [],
    provinceId: [],
    districtId: [],
    wardId: [],
    villageId: [],
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
      phoneNumber: department.phoneNumber,
      countryId: department.countryId,
      provinceId: department.provinceId,
      districtId: department.districtId,
      wardId: department.wardId,
      villageId: department.villageId,
    });
  }

  protected createFromForm(): IDepartment {
    return {
      ...new Department(),
      departmentId: this.editForm.get(['departmentId'])!.value,
      name: this.editForm.get(['name'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      countryId: this.editForm.get(['countryId'])!.value,
      provinceId: this.editForm.get(['provinceId'])!.value,
      districtId: this.editForm.get(['districtId'])!.value,
      wardId: this.editForm.get(['wardId'])!.value,
      villageId: this.editForm.get(['villageId'])!.value,
    };
  }
}
