import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IProject, Project } from '../project.model';
import { ProjectService } from '../service/project.service';

import { ProjectDisasterService } from 'app/entities/project-disaster/service/project-disaster.service';
import { IProjectDisaster } from 'app/entities/project-disaster/project-disaster.model';
import { DisasterService } from 'app/entities/disaster/service/disaster.service';
import { IDisaster } from 'app/entities/disaster/disaster.model';

@Component({
  selector: 'jhi-project-update',
  templateUrl: './project-update.component.html',
})
export class ProjectUpdateComponent implements OnInit {
  isSaving = false;
  disasters: IDisaster[] = [];

  editForm = this.fb.group({
    projectId: [],
    disasterId: [],
    name: [],
    description: [],
    value: [],
    projectManager: [],
    locationId: [],
  });

  constructor(
    protected projectService: ProjectService, 
    protected projectDisasterService: ProjectDisasterService,
    protected disasterService: DisasterService,
    protected activatedRoute: ActivatedRoute, 
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ project }) => {
      this.updateForm(project);
    });

    this.disasterService.query().subscribe(res => {
      if(res.body){
        this.disasters = res.body;
      }
    })
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const project = this.createFromForm();
    if (project.projectId !== undefined) {
      this.subscribeToSaveResponse(this.projectService.update(project));
    } else {
      this.subscribeToSaveResponse(this.projectService.create(project));
    }
  }

  addProjectDisasterEntry(res: HttpResponse<IProject>): Observable<HttpResponse<any>> {
    const payload: IProjectDisaster = { 
      projectId: res.body?.projectId,
      disastertId: this.editForm.get(['disasterId'])!.value,
    }
    return this.projectDisasterService.create(payload) 
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProject>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: (res) => this.onSaveSuccess(res),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(payload: HttpResponse<IProject>): void {
    this.addProjectDisasterEntry(payload).subscribe(() => this.previousState())
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(project: IProject): void {
    this.editForm.patchValue({
      projectId: project.projectId,
      disasterId: project.disasterId,
      name: project.name,
      description: project.description,
      value: project.value,
      projectManager: project.projectManager,
      locationId: project.locationId,
    });
  }

  protected createFromForm(): IProject {
    return {
      ...new Project(),
      projectId: this.editForm.get(['projectId'])!.value,
      disasterId: this.editForm.get(['disasterId'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      value: this.editForm.get(['value'])!.value,
      projectManager: this.editForm.get(['projectManager'])!.value,
      locationId: this.editForm.get(['locationId'])!.value,
    };
  }
}
