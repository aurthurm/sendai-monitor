import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDonation, Donation } from '../donation.model';
import { IDisaster } from '../../disaster/disaster.model';
import { DonationService } from '../service/donation.service';
import dayjs from 'dayjs/esm';
import { DATE_FORMAT } from 'app/config/input.constants';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { DisasterService } from 'app/entities/disaster/service/disaster.service';
import { DepartmentService } from 'app/entities/department/service/department.service';
import { IDepartment } from 'app/entities/department/department.model';

@Component({
  selector: 'jhi-donation-update',
  templateUrl: './donation-update.component.html',
})
export class DonationUpdateComponent implements OnInit {
  isSaving = false;
  departments: IDepartment[] = [];
  dropdownList: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  disasters: IDisaster[] = [];
  selectedItems: Array<any> = [];
  editForm = this.fb.group({
    donorId: [],
    disasterId: [],
    name: [],
    type: [],
    valueOfDonation: [],
    valueUtelized: [],
    currency: [],
    comment: [],
    utelizationComment: [],
    dateIssued: [],
    developmentPartnerId: [],
  });

  productForm: FormGroup;

  constructor(protected donationService: DonationService, protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder, protected disasterService: DisasterService,
    protected departmentService: DepartmentService) {
    this.productForm = this.fb.group({
      
      name: '',
      quantities:
        this.fb.array([]),
    });
  }


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ donation }) => {

      this.updateForm(donation);
      console.log(donation, "Donation") // eslint-disable-line
    });

    this.disasterService.query().subscribe(res => {
      if (res.body) {
        this.dropdownList = res.body;
      }
    })

    this.departmentService.query().subscribe(res => {
      if (res.body) {
        this.departments = res.body;
      }
    })

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'disasterId',
      textField: 'name',
      allowSearchFilter: true,
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
    };
  }

  quantities(): FormArray {
    return this.productForm.get("quantities") as FormArray
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      id: '',
      name: '',
      qty: '',
      price: '',
    })
  }

  addQuantity(): void {
    this.quantities().push(this.newQuantity());
  }

  removeQuantity(i: number): void {
    this.quantities().removeAt(i);
  }



  onItemSelect(item: any): void {
    this.disasters.push(item);
  }
  onItemDeSelect(item: any): void {
    this.disasters.forEach((i, index) => {
      if (i.disasterId === item.disasterId) {
        this.disasters.splice(index, 1);
      }
    })
    console.log(this.disasters) // eslint-disable-line
  }

  onSelectAll(items: any): void {
    this.disasters = this.dropdownList;
    console.log("onSelectAll", items); // eslint-disable-line
  }

  onDeSelectAll(item: any): void {
    this.disasters = [];
    console.log("onDeSelectAll", item); // eslint-disable-line
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;

    this.quantities().controls.forEach(element => {
      console.log("onDeSelectAll", element); // eslint-disable-line
    });
    const donation = this.createFromForm();
    if (donation.donorId !== undefined) {
      this.subscribeToSaveResponse(this.donationService.update(donation));
    } else {
      this.subscribeToSaveResponse(this.donationService.create(donation));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDonation>>): void {
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

  protected updateForm(donation: IDonation): void {
    this.editForm.patchValue({
      donorId: donation.donorId,
      disasterId: donation.disasterId,
      name: donation.name,
      type: donation.type,
      valueOfDonation: donation.valueOfDonation,
      valueUtelized: donation.valueUtelized,
      currency: donation.currency,
      comment: donation.comment,
      utelizationComment: donation.utelizationComment,
      dateIssued: donation.dateIssued ? donation.dateIssued.format(DATE_FORMAT) : null,
      developmentPartnerId: donation.developmentPartnerId,
    });
  }

  protected createFromForm(): IDonation {
    return {
      ...new Donation(),
      donorId: this.editForm.get(['donorId'])!.value,
      disasterId: this.disasters[0].disasterId,
      name: this.editForm.get(['name'])!.value,
      type: this.editForm.get(['type'])!.value,
      valueOfDonation: this.editForm.get(['valueOfDonation'])!.value,
      valueUtelized: this.editForm.get(['valueUtelized'])!.value,
      currency: this.editForm.get(['currency'])!.value,
      comment: this.editForm.get(['comment'])!.value,
      utelizationComment: this.editForm.get(['utelizationComment'])!.value,
      dateIssued: this.editForm.get(['dateIssued'])!.value
        ? dayjs(this.editForm.get(['dateIssued'])!.value, DATE_FORMAT)
        : undefined,

      developmentPartnerId: this.editForm.get(['developmentPartnerId'])!.value,
    };
  }
}
