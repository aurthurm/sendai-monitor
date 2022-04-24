import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, FormArray,FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { IHumanPopulation } from '../human-population.model';
import { HumanPopulationService } from '../service/human-population.service';
import { IDisasterCategory } from 'app/entities/disaster-category/disaster-category.model';
import { DisasterCategoryService } from 'app/entities/disaster-category/service/disaster-category.service';
import { ICasualty } from 'app/entities/casualty/casualty.model';
import { CasualtyService } from 'app/entities/casualty/service/casualty.service';

@Component({
  selector: 'jhi-human-population-update',
  templateUrl: './human-population-update.component.html',
  styleUrls: ['./human-population.scss'],
})
export class HumanPopulationUpdateComponent implements OnInit {
  @Input() disasterId = "";
  @Input() casualtyId = "";
  @Input() disabled = false;
  isSaving = false;
  disasterCategories: IDisasterCategory[] = [];
  humanPopulationData: any[] = [];
  editable: any[] = [];
  casualties: ICasualty[] = [];

  form = this.fb.group({
    children_male: this.fb.group({
      enabled: this.fb.array([]),
      disabled: this.fb.array([]),
    }),
    children_female: this.fb.group({
      enabled: this.fb.array([]),
      disabled: this.fb.array([]),
    }),
    middle_aged_male: this.fb.group({
      enabled: this.fb.array([]),
      disabled: this.fb.array([]),
    }),
    middle_aged_female: this.fb.group({
      enabled: this.fb.array([]),
      disabled: this.fb.array([]),
    }),
    elderly_male: this.fb.group({
      enabled: this.fb.array([]),
      disabled: this.fb.array([]),
    }),
    elderly_female: this.fb.group({
      enabled: this.fb.array([]),
      disabled: this.fb.array([]),
    }),
    unknown: this.fb.group({
      enabled: this.fb.array([]),
      disabled: this.fb.array([]),
    }),
  });

  constructor(
    protected humanPopulationService: HumanPopulationService, 
    protected disasterCategoryService: DisasterCategoryService,
    protected casualtyService: CasualtyService,
    protected activatedRoute: ActivatedRoute, 
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.disasterCategoryService.query().subscribe(res => {
      if(res.body){
        this.disasterCategories = res.body;
        this.humanPopulationService.queryForDisaster(this.disasterId, { size: 100 }).subscribe(resp => {
          if(resp.body){
            this.humanPopulationData = resp.body;
            this.prepareForm()
          }
        })
      }
    })

    console.log(this.disabled); // eslint-disable-line no-console
  }

  prepareForm(): void {
    this.groupBy(this.humanPopulationData).forEach((gender: any, key: any) => {
      const genderKey = key?.toLowerCase();
      this.mapToArray(gender).forEach((poType) => {
        const popTypeKey = poType?.name?.toLowerCase();
        poType?.value
        ?.sort((a: IHumanPopulation, b: IHumanPopulation) => a.humanPopulationDisasterCategoryId! > b.humanPopulationDisasterCategoryId! ? 1 : -1)
        ?.forEach((popn: IHumanPopulation) => {
          ((this.form.get(genderKey) as FormGroup)
          .get(popTypeKey) as FormArray)
          .push(this.popnFormValidator(popn))
        })
      })
    })
  }

  // Cildren
  get childrenMaleEnabled(): FormArray {
    return (this.form.get("children_male") as FormGroup).get('enabled') as FormArray;
  }

  get childrenMaleDisabled(): FormArray {
    return (this.form.get("children_male") as FormGroup).get('disabled') as FormArray;
  }

  get childrenFemaleEnabled(): FormArray {
    return (this.form.get("children_female") as FormGroup).get('enabled') as FormArray;
  }

  get childrenFemaleDisabled(): FormArray {
    return (this.form.get("children_female") as FormGroup).get('disabled') as FormArray;
  }

  // MiddleAged
  get middleAgedMaleEnabled(): FormArray {
    return (this.form.get("middle_aged_male") as FormGroup).get('enabled') as FormArray;
  }

  get middleAgedMaleDisabled(): FormArray {
    return (this.form.get("middle_aged_male") as FormGroup).get('disabled') as FormArray;
  }

  get middleAgedFemaleEnabled(): FormArray {
    return (this.form.get("middle_aged_female") as FormGroup).get('enabled') as FormArray;
  }

  get middleAgedFemaleDisabled(): FormArray {
    return (this.form.get("middle_aged_female") as FormGroup).get('disabled') as FormArray;
  }

  // MiddleAged
  get elderlyMaleEnabled(): FormArray {
    return (this.form.get("elderly_male") as FormGroup).get('enabled') as FormArray;
  }

  get elderlyMaleDisabled(): FormArray {
    return (this.form.get("elderly_male") as FormGroup).get('disabled') as FormArray;
  }

  get elderlyFemaleEnabled(): FormArray {
    return (this.form.get("elderly_female") as FormGroup).get('enabled') as FormArray;
  }

  get elderlyFemaleDisabled(): FormArray {
    return (this.form.get("elderly_female") as FormGroup).get('disabled') as FormArray;
  }

  // MiddleAged
  get unknownEnabled(): FormArray {
    return (this.form.get("unknown") as FormGroup).get('enabled') as FormArray;
  }
  
  get unknownDisabled(): FormArray {
    return (this.form.get("unknown") as FormGroup).get('disabled') as FormArray;
  }

  save(): void {
    let final = false;
    this.isSaving = true;
    let data: any[] = [];
    [
      'children_male', 'children_female',
      'middle_aged_male','middle_aged_female',
      'elderly_male', 'elderly_female',
      'unknown'
    ].forEach((gender: string) => {
      ['enabled','disabled'].forEach(ability => {
        data = data.concat(this.form.value[gender][ability])
      })
    })

    data.forEach((humanPopulation: IHumanPopulation, key: number, arr: any[]) => {
      if (key + 1 === arr.length){ 
        final = true
      }
      if (!["", null, undefined].includes(humanPopulation.humanPopulationId)) {
        this.humanPopulationService.update(humanPopulation).subscribe(() => this.onSaveFinalize(final))
      } else {
        this.humanPopulationService.create(humanPopulation).subscribe(() => this.onSaveFinalize(final))
      }
    })
  }

  popnFormValidator = (popn: IHumanPopulation): FormGroup =>
    new FormGroup({
      humanPopulationId: new FormControl(popn.humanPopulationId),
      disasterId: new FormControl(popn.disasterId),
      populationType: new FormControl(popn.populationType),
      disabled: new FormControl(popn.disabled),
      value: new FormControl({value: popn.value, disabled: this.disabled}), 
      humanPopulationDisasterCategoryId: new FormControl(popn.humanPopulationDisasterCategoryId),
      humanPopulationDisasterCategoryName: new FormControl(popn.humanPopulationDisasterCategoryName),
  });

  groupBy(pops: IHumanPopulation[]): any {
    const data = new Map()
    pops.forEach(p => {
      const key = p.populationType ?? 'No Type';
      if(!data.has(key)){
        data.set(key, new Map())
      }
      const inner = data.get(key);
      const keyX = p.disabled ?? 'Unknown';
      if(!inner.has(keyX)){
        inner.set(keyX, [])
      }
      inner.get(keyX).push(p)
    })
    return data
  }

  getByValue(data: any[]): any {
    let final;
    data.some(item => {
      if(['value'].includes(item[0])){
        final = item[1]
      }
      return ['value'].includes(item[0])
    })
    return final
  }

  objectToEntries(data: any): any[] {
    return Object.entries(data)
  }

  mapToArray(map: any): any[] {
    return [...map].map(([name, value]) => ({ name, value }));
  }

  protected onSaveFinalize(final: boolean): void {
    if(final) {
      // this.initialize();
      setTimeout(() => this.isSaving = false, 2000)
    }
  }

  protected updateForm(form:any, humanPopulation: IHumanPopulation): void {
    form.patchValue({
      humanPopulationId: humanPopulation.humanPopulationId,
      disasterId: humanPopulation.disasterId,
      populationType: humanPopulation.populationType,
      disabled: humanPopulation.disabled,
      value: humanPopulation.value,
      estimatedLoss: humanPopulation.humanPopulationDisasterCategoryName,
      humanPopulationDisasterCategoryName: humanPopulation.humanPopulationDisasterCategoryName,
    });
  }

}