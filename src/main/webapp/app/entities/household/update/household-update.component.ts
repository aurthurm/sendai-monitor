import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { IHousehold, Household } from '../household.model';
import { HouseholdService } from '../service/household.service';
import { IHouseholdType } from 'app/entities/household-type/household-type.model';
import { HouseholdTypeService } from 'app/entities/household-type/service/household-type.service';
import { ICasualty } from 'app/entities/casualty/casualty.model';
import { CasualtyService } from 'app/entities/casualty/service/casualty.service';
import { IDisaster } from 'app/entities/disaster/disaster.model';
import { DisasterService } from 'app/entities/disaster/service/disaster.service';

@Component({
  selector: 'jhi-household-update',
  templateUrl: './household-update.component.html',
})
export class HouseholdUpdateComponent implements OnInit {
  @Input() disasterId = "";
  @Input() casualtyId = "";
  @Input() disabled = false;
  isSaving = false;
  householdTypes: IHouseholdType[] = [];
  casualties: ICasualty[] = [];
  disasters: IDisaster[] = [];
  infraData: IHousehold[] = [];


  form = this.fb.group({
    disasterId: ['',],
    households: this.fb.array([])
  });

  constructor(
    protected householdService: HouseholdService,
    protected householdTypeService: HouseholdTypeService,
    protected casualtyService: CasualtyService,
    protected disasterService: DisasterService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initialize();

    this.casualtyService.query().subscribe(res => {
      if(res.body){
        this.casualties = res.body;
      }
    })
  }

  initialize(): void {
    
    this.households.clear();

    this.householdTypeService.query().subscribe(res => {
      if(res.body){
        this.householdTypes = res.body;

        this.householdService.queryForDisaster(this.disasterId).subscribe(resp => {
          if(resp.body){
            this.infraData = resp.body;
          }
          this.householdTypes.forEach(iType => {
            const index = this.infraData.findIndex(infra => infra.householdTypeId === iType.householdTypeId)
            const form = this.householdForm();
            if(index > -1){
              this.updateForm(form, {
                ... new Household(),
                ... this.infraData[index],
              })
            } else {
              this.updateForm(form, {
                ... new Household(),
                disasterId: this.disasterId,
                householdTypeId: iType.householdTypeId,
              });
            }
            this.households.push(form)
          })
        })

      }
    })
  }

  save(): void {
    let final = false; 

    this.isSaving = true;
    
    this.form.value?.households?.forEach((household: Household, key: number, arr: any[]) => {
      
      if (key + 1 === arr.length){ 
        final = true
      }

      if (["", undefined, null].includes(household.householdId)) {
        this.householdService.create(household).subscribe(() => this.onFinish(final))
      } else {
        this.householdService.update(household).subscribe(() => this.onFinish(final))
      }

    })
}

onFinish(end: boolean): void {
  if(end) {
    // this.initialize();
    setTimeout(() => this.isSaving = false, 2000)
  }
}

householdForm(): any {
  return this.fb.group({
    householdId: [],
    disasterId: [],
    householdTypeId: [],
    numberOfHouseholds:  new FormControl({value: "", disabled: this.disabled}),
    numberChildHeaded:  new FormControl({value: "", disabled: this.disabled}),
    numberFemaleHeaded:  new FormControl({value: "", disabled: this.disabled}),
    numberOfPeopleAffected:  new FormControl({value: "", disabled: this.disabled}),

  });
}

  get households(): FormArray {
    return this.form.get("households") as FormArray;
  }

  addHouseholdRow(): void {
    const frm = this.householdForm()
    frm.patchValue({
      disasterId: this.disasterId,
    });

    this.households.push(frm)
  }

  removeHouseholdRow(index: number): void {
    this.households.removeAt(index);
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(frm: any, household: IHousehold): any {
    frm.patchValue({
      householdId: household.householdId,
      disasterId: household.disasterId,
      householdTypeId: household.householdTypeId,
      numberOfHouseholds: household.numberOfHouseholds,
      numberChildHeaded: household.numberChildHeaded,
      numberFemaleHeaded: household.numberFemaleHeaded,
      numberOfPeopleAffected: household.numberOfPeopleAffected,
    });
  }

  protected createFromForm(frm: any): IHousehold {
    return {
      ...new Household(),
      householdId: frm.get(['householdId'])!.value,
      disasterId: frm.get(['disasterId'])!.value,
      householdTypeId: frm.get(['householdTypeId'])!.value,
      numberOfHouseholds: frm.get(['numberOfHouseholds'])!.value,
      numberChildHeaded: frm.get(['numberChildHeaded'])!.value,
      numberFemaleHeaded: frm.get(['numberFemaleHeaded'])!.value,
      numberOfPeopleAffected: frm.get(['numberOfPeopleAffected'])!.value,
    };
  }
}
