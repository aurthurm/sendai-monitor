import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { IVillage, Village } from '../village.model';
import { VillageService } from '../service/village.service';

import { WardService } from '../../ward/service/ward.service';
import { IWard} from '../../ward/ward.model';
import { ProvinceService } from '../../province/service/province.service';
import { IProvince } from '../../province/province.model';
import { DistrictService } from '../../district/service/district.service';
import { IDistrict} from '../../district/district.model';

@Component({
  selector: 'jhi-village-update',
  templateUrl: './village-update.component.html',
})
export class VillageUpdateComponent implements OnInit {
  isSaving = false;

  dropdownList: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  provinces: IProvince[] = [];
  districtId ="";
  wardId ="";
  villageLevel = 5;
  districtDropdownList: any[] = [];
  districtDropdownSettings: IDropdownSettings = {};
  wardDropdownList: any[] = [];
  wardDropdownSettings: IDropdownSettings = {};
  districts: IDistrict[] = [];
  wards: IWard[] = [];

  editForm = this.fb.group({
    villageId: [],
    wardId: [],
    name: [],
    latitude: [],
    longitude: [],
    level: [],
  });

  constructor(protected villageService: VillageService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder,
    protected wardService: WardService, protected provinceService: ProvinceService, protected districtService: DistrictService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ village }) => {
      this.updateForm(village);
    });

    this.provinceService.query().subscribe(res => {
      if (res.body) {
        this.dropdownList = res.body;
      }
    })

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'provinceId',
      textField: 'name',
      allowSearchFilter: true,
      itemsShowLimit: 3,
    };

    this.districtDropdownSettings = {
      singleSelection: true,
      idField: 'districtId',
      textField: 'name',
      allowSearchFilter: true,
      itemsShowLimit: 3,
    };

    this.wardDropdownSettings = {
      singleSelection: true,
      idField: 'wardId',
      textField: 'name',
      allowSearchFilter: true,
      itemsShowLimit: 3,
    };
  }

  onItemSelect(item: any): void {
    //this.provinces.push(item);
    this.districtService.findByProvinceId(item.provinceId).subscribe(res => {
      if (res.body) {
        this.districtDropdownList = res.body;
      }
    })
  }

  onItemDeSelect(item: any): void {
    this.districtDropdownList = [];
    console.log(this.districtDropdownList) // eslint-disable-line
  }

  onDistrictItemSelect(item: any): void {
    this.wardService.findByDistrictId(item.districtId).subscribe(res => {
      if (res.body) {
        this.wardDropdownList = res.body;
        console.log(this.wardDropdownList) // eslint-disable-line
      }
    })
    
  }
  onDistrictItemDeSelect(item: any): void {
    this.districtId = "";
    console.log(this.districts) // eslint-disable-line
  }

  onWardItemSelect(item: any): void {
    this.wardId = item.wardId;
  }
  onWardItemDeSelect(item: any): void {
    this.wardId = "";
    console.log(this.wards) // eslint-disable-line
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const village = this.createFromForm();
    if (village.villageId !== undefined) {
      this.subscribeToSaveResponse(this.villageService.update(village));
    } else {
      this.subscribeToSaveResponse(this.villageService.create(village));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVillage>>): void {
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

  protected updateForm(village: IVillage): void {
    this.editForm.patchValue({
      villageId: village.villageId,
      wardId: this.wardId,
      name: village.name,
      latitude: village.latitude,
      longitude: village.longitude,
      level: this.villageLevel,
    });
  }

  protected createFromForm(): IVillage {
    return {
      ...new Village(),
      villageId: this.editForm.get(['villageId'])!.value,
      wardId: this.wardId,
      name: this.editForm.get(['name'])!.value,
      latitude: this.editForm.get(['latitude'])!.value,
      longitude: this.editForm.get(['longitude'])!.value,
      level: this.villageLevel,
    };
  }
}
