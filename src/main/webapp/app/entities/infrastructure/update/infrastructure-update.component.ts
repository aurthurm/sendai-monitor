import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { IInfrastructure, Infrastructure } from '../infrastructure.model';
import { InfrastructureService } from '../service/infrastructure.service';
import { IInfrastructureType } from 'app/entities/infrastructure-type/infrastructure-type.model';
import { InfrastructureTypeService } from 'app/entities/infrastructure-type/service/infrastructure-type.service';
import { ICasualty } from 'app/entities/casualty/casualty.model';
import { CasualtyService } from 'app/entities/casualty/service/casualty.service';
import { IDisaster } from 'app/entities/disaster/disaster.model';
import { DisasterService } from 'app/entities/disaster/service/disaster.service';

@Component({
  selector: 'jhi-infrastructure-update',
  templateUrl: './infrastructure-update.component.html',
})
export class InfrastructureUpdateComponent implements OnInit {
  @Input() disasterId = "";
  @Input() casualtyId = "";
  @Input() disabled = false;
  isSaving = false;
  infrastructureTypes: IInfrastructureType[] = [];
  casualties: ICasualty[] = [];
  disasters: IDisaster[] = [];
  infraData: IInfrastructure[] = [];


  form = this.fb.group({
    disasterId: ['',],
    casualtyId: ['',],
    infrastructures: this.fb.array([])
  });

  constructor(
    protected infrastructureService: InfrastructureService,
    protected infrastructureTypeService: InfrastructureTypeService,
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
    
    this.infrastructures.clear();

    this.infrastructureTypeService.query().subscribe(res => {
      if(res.body){
        this.infrastructureTypes = res.body;

        this.infrastructureService.queryForDisaster(this.disasterId).subscribe(resp => {
          if(resp.body){
            this.infraData = resp.body;
          }
          this.infrastructureTypes.forEach(iType => {
            const index = this.infraData.findIndex(infra => infra.infractructureTypeId === iType.infractructureTypeId)
            const form = this.infrastructureForm();
            if(index > -1){
              this.updateForm(form, {
                ... new Infrastructure(),
                ... this.infraData[index],
              })
            } else {
              this.updateForm(form, {
                ... new Infrastructure(),
                disasterId: this.disasterId,
                casualtyId: this.casualtyId,
                infractructureTypeId: iType.infractructureTypeId,
              });
            }
            this.infrastructures.push(form)
          })
        })

      }
    })
  }

  save(): void {
    let final = false; 

    this.isSaving = true;
    
    this.form.value?.infrastructures?.forEach((infrastructure: Infrastructure, key: number, arr: any[]) => {
      
      if (key + 1 === arr.length){ 
        final = true
      }

      if (["", undefined, null].includes(infrastructure.infractructureId)) {
        this.infrastructureService.create(infrastructure).subscribe(() => this.onFinish(final))
      } else {
        this.infrastructureService.update(infrastructure).subscribe(() => this.onFinish(final))
      }

    })
}

onFinish(end: boolean): void {
  if(end) {
    // this.initialize();
    setTimeout(() => this.isSaving = false, 2000)
  }
}

infrastructureForm(): any {
  return this.fb.group({
    infractructureId: [],
    disasterId: [],
    casualtyId:  [],
    infractructureTypeId: [],
    damaged:  new FormControl({value: "", disabled: this.disabled}),
    destroyed:  new FormControl({value: "", disabled: this.disabled}),
    value:  new FormControl({value: "", disabled: this.disabled}),
  });
}

  get infrastructures(): FormArray {
    return this.form.get("infrastructures") as FormArray;
  }

  addInfrastructureRow(): void {
    const frm = this.infrastructureForm()
    frm.patchValue({
      disasterId: this.disasterId,
      casualtyId: this.casualtyId,
    });

    this.infrastructures.push(frm)
  }

  removeInfrastructureRow(index: number): void {
    this.infrastructures.removeAt(index);
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(frm: any, infrastructure: IInfrastructure): any {
    frm.patchValue({
      infractructureId: infrastructure.infractructureId,
      disasterId: infrastructure.disasterId,
      casualtyId: infrastructure.casualtyId,
      infractructureTypeId: infrastructure.infractructureTypeId,
      damaged: infrastructure.damaged,
      destroyed: infrastructure.destroyed,
      value: infrastructure.value,
    });
  }

  protected createFromForm(frm: any): IInfrastructure {
    return {
      ...new Infrastructure(),
      infractructureId: frm.get(['infractructureId'])!.value,
      disasterId: frm.get(['disasterId'])!.value,
      casualtyId: frm.get(['casualtyId'])!.value,
      infractructureTypeId: frm.get(['infractructureTypeId'])!.value,
      damaged: frm.get(['damaged'])!.value,
      destroyed: frm.get(['destroyed'])!.value,
      value: frm.get(['value'])!.value,
    };
  }
}
