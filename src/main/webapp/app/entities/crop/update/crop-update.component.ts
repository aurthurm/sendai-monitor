import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ICrop, Crop } from '../crop.model';
import { CropService } from '../service/crop.service';
import { ICropType } from 'app/entities/crop-type/crop-type.model';
import { CropTypeService } from 'app/entities/crop-type/service/crop-type.service';
import { ICasualty } from 'app/entities/casualty/casualty.model';
import { CasualtyService } from 'app/entities/casualty/service/casualty.service';
import { IDisaster } from 'app/entities/disaster/disaster.model';
import { DisasterService } from 'app/entities/disaster/service/disaster.service';

@Component({
  selector: 'jhi-crop-update',
  templateUrl: './crop-update.component.html',
})
export class CropUpdateComponent implements OnInit {
  @Input() disasterId = "";
  @Input() casualtyId = "";
  @Input() disabled = false;
  isSaving = false;
  cropTypes: ICropType[] = [];
  cropData: ICrop[] = [];
  casualties: ICasualty[] = [];
  disasters: IDisaster[] = [];

  form = this.fb.group({
    disasterId: [],
    casualtyId: [],
    crops: this.fb.array([])
  });

  constructor(
    protected cropService: CropService, 
    protected cropTypeService: CropTypeService,
    protected casualtyService: CasualtyService,
    protected disasterService: DisasterService,
    protected activatedRoute: ActivatedRoute, 
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.initialize();

    // this.disasterService.query().subscribe(res => {
    //   if(res.body){
    //     this.disasters = res.body;
    //   }
    // })

    this.casualtyService.query().subscribe(res => {
      if(res.body){
        this.casualties = res.body;
      }
    })

    this.cropTypeService.query({ disasterId: this.disasterId }).subscribe(res => {
      if(res.body){
        this.cropTypes = res.body;
      }
    })
  }

  initialize(): void {
    
    this.crops.clear();

    this.cropTypeService.query().subscribe(res => {
      if(res.body){
        this.cropTypes = res.body;

        this.cropService.queryForDisaster(this.disasterId).subscribe(resp => {
          if(resp.body){
            this.cropData = resp.body;
          }
          this.cropTypes.forEach(iType => {
            const index = this.cropData.findIndex(infra => infra.cropTypeId === iType.cropTypeId)
            const form = this.cropForm();
            if(index > -1){
              this.updateForm(form, {
                ... new Crop(),
                ... this.cropData[index],
              })
            } else {
              this.updateForm(form, {
                ... new Crop(),
                disasterId: this.disasterId,
                casualtyId: this.casualtyId,
                cropTypeId: iType.cropTypeId,
              });
            }
            this.crops.push(form)
          })
        })

      }
    })
  }

  save(): void {
    let final = false;
    this.isSaving = true;
    this.form.value?.crops?.forEach((crop: ICrop, key: number, arr: any[]) => {
      if (key + 1 === arr.length){ 
        final = true
      }
      if (crop.cropId !== undefined) {
        this.cropService.update(crop).subscribe(() => this.onSaveFinalize(final))
      } else {
        this.cropService.create(crop).subscribe(() => this.onSaveFinalize(final))
      }
    })
  }

  cropForm(): any {
    return this.fb.group({
      cropId: [],
      disasterId: [],
      casualtyId: [],
      cropTypeId: [],
      hecterageAffected: new FormControl({value: "", disabled: this.disabled}),
      estimatedLoss: new FormControl({value: "", disabled: this.disabled}),
    });
  }  
  
  get crops(): FormArray {
    return this.form.get("crops") as FormArray;
  }

  addCropRow(): void {
    const frm = this.cropForm()
    frm.patchValue({
      disasterId: this.disasterId,
      casualtyId: this.casualtyId,
    });

    this.crops.push(frm)
  }

  removeCropRow(index: number): void {
    this.crops.removeAt(index);
  }


  protected onSaveFinalize(final: boolean): void {
    if(final) {
      // this.initialize();
      setTimeout(() => this.isSaving = false, 2000)
    }
  }

  protected updateForm(form:any, crop: ICrop): void {
    form.patchValue({
      cropId: crop.cropId,
      disasterId: crop.disasterId,
      casualtyId: crop.casualtyId,
      cropTypeId: crop.cropTypeId,
      hecterageAffected: crop.hecterageAffected,
      estimatedLoss: crop.estimatedLoss,
    });
  }

  protected createFromForm(): ICrop {
    return {
      ...new Crop(),
      disasterId: this.form.get(['disasterId'])!.value,
      casualtyId: this.form.get(['casualtyId'])!.value,
      cropTypeId: this.form.get(['cropTypeId'])!.value,
      hecterageAffected: this.form.get(['hecterageAffected'])!.value,
      estimatedLoss: this.form.get(['estimatedLoss'])!.value,
    };
  }
}
