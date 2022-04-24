import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_FORMAT } from 'app/config/input.constants';

import { ICasualty, Casualty } from '../casualty.model';
import { CasualtyService } from '../service/casualty.service';
import { SEX } from 'app/entities/enumerations/sex.model';

import { IDisaster } from 'app/entities/disaster/disaster.model';
import { DisasterService } from 'app/entities/disaster/service/disaster.service';

@Component({
  selector: 'jhi-casualty-update',
  templateUrl: './casualty-update.component.html',
})
export class CasualtyUpdateComponent implements OnInit {
  isSaving = false;
  sEXValues = Object.keys(SEX);
  disasters: IDisaster[] = [];

  editForm = this.fb.group({
    casualtyId: [],
    disasterId: [],
    nationalId: [],
    anonymous: [],
    firstName: [],
    lastName: [],
    dob: [],
    dobEstimated: [],
    age: [],
    sex: [],
    dependents: [],
    occupation: [],
    nationality: [],
    displaced: [],
    affected: [],
    injured: [],
    missing: [],
    dead: [],
    disabilityBefore: [],
    disabilityAfter: [],
    replay: [],
  });

  constructor(
    protected casualtyService: CasualtyService, 
    protected disasterService: DisasterService, 
    protected activatedRoute: ActivatedRoute, 
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ casualty }) => {
      if (casualty.casualtyId === undefined) {
        const today = dayjs().startOf('day');
        casualty.dob = today;
      }

      this.updateForm(casualty);
    });

    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.disasterId) {
        this.editForm.patchValue({
          disasterId: params.disasterId,
        });
      }
    });

    this.disasterService.query().subscribe(res=> {
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
    const casualty = this.createFromForm();
    if (casualty.casualtyId !== undefined) {
      this.subscribeToSaveResponse(this.casualtyService.update(casualty));
    } else {
      this.subscribeToSaveResponse(this.casualtyService.create(casualty));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICasualty>>): void {
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

  protected updateForm(casualty: ICasualty): void {
    this.editForm.patchValue({
      casualtyId: casualty.casualtyId,
      disasterId: casualty.disasterId,
      nationalId: casualty.nationalId,
      firstName: casualty.firstName,
      lastName: casualty.lastName,
      anonymous: casualty.anonymous,
      dob: casualty.dob ? casualty.dob.format(DATE_FORMAT) : null,
      dobEstimated: casualty.dobEstimated,
      age: casualty.age,
      sex: casualty.sex,
      dependents: casualty.dependents,
      occupation: casualty.occupation,
      nationality: casualty.nationality,
      displaced: casualty.displaced,
      affected: casualty.affected,
      injured: casualty.injured,
      missing: casualty.missing,
      dead: casualty.dead,
      disabilityBefore: casualty.disabilityBefore,
      disabilityAfter: casualty.disabilityAfter,
      replay: casualty.replay,
    });
  }

  protected createFromForm(): ICasualty {
    return {
      ...new Casualty(),
      casualtyId: this.editForm.get(['casualtyId'])!.value,
      disasterId: this.editForm.get(['disasterId'])!.value,
      nationalId: this.editForm.get(['nationalId'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      anonymous: this.editForm.get(['anonymous'])!.value,
      dob: this.editForm.get(['dob'])!.value ? dayjs(this.editForm.get(['dob'])!.value, DATE_FORMAT) : undefined,
      dobEstimated: this.editForm.get(['dobEstimated'])!.value,
      age: this.editForm.get(['age'])!.value,
      sex: this.editForm.get(['sex'])!.value,
      dependents: this.editForm.get(['dependents'])!.value,
      occupation: this.editForm.get(['occupation'])!.value,
      nationality: this.editForm.get(['nationality'])!.value,
      displaced: this.editForm.get(['displaced'])!.value,
      affected: this.editForm.get(['affected'])!.value,
      injured: this.editForm.get(['injured'])!.value,
      missing: this.editForm.get(['missing'])!.value,
      dead: this.editForm.get(['dead'])!.value,
      disabilityBefore: this.editForm.get(['disabilityBefore'])!.value,
      disabilityAfter: this.editForm.get(['disabilityAfter'])!.value,
      replay: this.editForm.get(['replay'])!.value,
    };
  }
}
