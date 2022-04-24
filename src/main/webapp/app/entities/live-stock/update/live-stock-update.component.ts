import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ILiveStock, LiveStock } from '../live-stock.model';
import { LiveStockService } from '../service/live-stock.service';
import { ILiveStockType } from 'app/entities/live-stock-type/live-stock-type.model';
import { LiveStockTypeService } from 'app/entities/live-stock-type/service/live-stock-type.service';
import { ICasualty } from 'app/entities/casualty/casualty.model';
import { CasualtyService } from 'app/entities/casualty/service/casualty.service';
import { IDisaster } from 'app/entities/disaster/disaster.model';
import { DisasterService } from 'app/entities/disaster/service/disaster.service';

@Component({
  selector: 'jhi-live-stock-update',
  templateUrl: './live-stock-update.component.html',
})
export class LiveStockUpdateComponent implements OnInit {
  @Input() disasterId = "";
  @Input() casualtyId = "";
  @Input() disabled = false;
  isSaving = false;
  livestockTypes: ILiveStockType[] = [];
  liveStockData: ILiveStock[] = [];
  casualties: ICasualty[] = [];
  disasters: IDisaster[] = [];

  form = this.fb.group({
    disasterId: [],
    casualtyId: [],
    liveStocks: this.fb.array([]) ,  
  });

  constructor(
    protected liveStockService: LiveStockService, 
    protected liveStockTypeService: LiveStockTypeService,
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
    
    this.liveStockTypeService.query().subscribe(res => {
      if(res.body){
        this.livestockTypes = res.body;

        this.liveStockService.queryForDisaster(this.disasterId).subscribe(resp => {
          if(resp.body){
            this.liveStockData = resp.body;
          }
          this.livestockTypes.forEach(iType => {
            const index = this.liveStockData.findIndex(infra => infra.liveStockTypeId === iType.liveStockTypeId)
            const form = this.liveStockForm();
            if(index > -1){
              this.updateForm(form, {
                ... new LiveStock(),
                ... this.liveStockData[index],
              })
            } else {
              this.updateForm(form, {
                ... new LiveStock(),
                disasterId: this.disasterId,
                casualtyId: this.casualtyId,
                liveStockTypeId: iType.liveStockTypeId,
              });
            }
            this.liveStocks.push(form)
          })
        })

      }
    })
  }

  save(): void {
    let final = false;
    this.isSaving = true;
    this.form.value?.liveStocks?.forEach((liveStock: ILiveStock, key: number, arr: any[]) => {
      if (key + 1 === arr.length){ 
        final = true
      }
      if (["", undefined, null].includes(liveStock.liveStockId)) {
        this.liveStockService.create(liveStock).subscribe(() => this.onSaveFinalize(final))
      } else {
        this.liveStockService.update(liveStock).subscribe(() => this.onSaveFinalize(final))
      }
    })
  }

  liveStockForm(): any {
    return this.fb.group({
      liveStockId: [],
      disasterId: [],
      casualtyId: [],
      liveStockTypeId: [],
      died: new FormControl({value: "", disabled: this.disabled}),
      missing: new FormControl({value: "", disabled: this.disabled}),
      ill: new FormControl({value: "", disabled: this.disabled}),
      injured: new FormControl({value: "", disabled: this.disabled}),
      estimatedLoss: new FormControl({value: "", disabled: this.disabled}),
    });
  }  
  
  get liveStocks(): FormArray {
    return this.form.get("liveStocks") as FormArray;
  }

  addLiveStockRow(): void {
    const frm = this.liveStockForm()
    frm.patchValue({
      disasterId: this.disasterId,
      casualtyId: this.casualtyId,
    });

    this.liveStocks.push(frm)
  }

  removeLiveStockRow(index: number): void {
    this.liveStocks.removeAt(index);
  }


  protected onSaveFinalize(final: boolean): void {
    if(final) {
      // this.initialize();
      setTimeout(() => this.isSaving = false, 2000)
    }
  }
  protected updateForm(form: any, liveStock: ILiveStock): void {
    form.patchValue({
      liveStockTypeId: liveStock.liveStockTypeId,
      liveStockId: liveStock.liveStockId,
      disasterId: liveStock.disasterId,
      casualtyId: liveStock.casualtyId,
      died: liveStock.died,
      missing: liveStock.missing,
      ill: liveStock.ill,
      injured: liveStock.injured,
      estimatedLoss: liveStock.estimatedLoss,
    });
  }

  protected createFromForm(): ILiveStock {
    return {
      ...new LiveStock(),
      disasterId: this.form.get(['disasterId'])!.value,
      casualtyId: this.form.get(['casualtyId'])!.value,
      liveStocks: this.liveStocks.value,
    };
  }

   
}
