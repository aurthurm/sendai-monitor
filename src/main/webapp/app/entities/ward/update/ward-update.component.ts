import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { IWard, Ward } from '../ward.model';

import { WardService } from '../service/ward.service';
import { ProvinceService } from '../../province/service/province.service';
import { IProvince } from '../../province/province.model';
import { DistrictService } from '../../district/service/district.service';
import { IDistrict} from '../../district/district.model';

@Component({
  selector: 'jhi-ward-update',
  templateUrl: './ward-update.component.html',
})
export class WardUpdateComponent implements OnInit {

  isSaving = false;
  dropdownList: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  provinces: IProvince[] = [];

  districtId ="";
  wardLevel = 4;
  districtDropdownList: any[] = [];
  districtDropdownSettings: IDropdownSettings = {};
  districts: IDistrict[] = [];
  editForm = this.fb.group({
    wardId: [],
    districtId: [],
    name: [],
    latitude: [],
    longitude: [],
    level: [],
  });

  constructor(protected wardService: WardService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder,
    protected provinceService: ProvinceService,protected districtService: DistrictService,) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ward }) => {
      this.updateForm(ward);
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
    this.districtId = item.districtId;
  }
  onDistrictItemDeSelect(item: any): void {
    this.districtId = "";
    console.log(this.districts) // eslint-disable-line
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ward = this.createFromForm();
    if (ward.wardId !== undefined) {
      this.subscribeToSaveResponse(this.wardService.update(ward));
    } else {
      this.subscribeToSaveResponse(this.wardService.create(ward));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWard>>): void {
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

  protected updateForm(ward: IWard): void {
    this.editForm.patchValue({
      wardId: ward.wardId,
      districtId: this.districtId,
      name: ward.name,
      latitude: ward.latitude,
      longitude: ward.longitude,
      level: this.wardLevel,
    });
  }

  protected createFromForm(): IWard {
    return {
      ...new Ward(),
      wardId: this.editForm.get(['wardId'])!.value,
      districtId: this.districtId,
      name: this.editForm.get(['name'])!.value,
      latitude: this.editForm.get(['latitude'])!.value,
      longitude: this.editForm.get(['longitude'])!.value,
      level: this.wardLevel,
    };
  }
}
