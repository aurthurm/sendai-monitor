import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IProjectDisaster, ProjectDisaster } from '../project-disaster.model';
import { ProjectDisasterService } from '../service/project-disaster.service';

@Component({
  selector: 'jhi-project-disaster-update',
  templateUrl: './project-disaster-update.component.html',
})
export class ProjectDisasterUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    projectDisasterId: [],
    projectId: [],
    disastertId: [],
  });

  constructor(
    protected projectDisasterService: ProjectDisasterService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ projectDisaster }) => {
      this.updateForm(projectDisaster);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const projectDisaster = this.createFromForm();
    if (projectDisaster.projectDisasterId !== undefined) {
      this.subscribeToSaveResponse(this.projectDisasterService.update(projectDisaster));
    } else {
      this.subscribeToSaveResponse(this.projectDisasterService.create(projectDisaster));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProjectDisaster>>): void {
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

  protected updateForm(projectDisaster: IProjectDisaster): void {
    this.editForm.patchValue({
      projectDisasterId: projectDisaster.projectDisasterId,
      projectId: projectDisaster.projectId,
      disastertId: projectDisaster.disastertId,
    });
  }

  protected createFromForm(): IProjectDisaster {
    return {
      ...new ProjectDisaster(),
      projectDisasterId: this.editForm.get(['projectDisasterId'])!.value,
      projectId: this.editForm.get(['projectId'])!.value,
      disastertId: this.editForm.get(['disastertId'])!.value,
    };
  }
}
