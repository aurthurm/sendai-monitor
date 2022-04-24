import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IAddress, Address } from '../address.model';
import { AddressService } from '../service/address.service';

@Component({
  selector: 'jhi-address-update',
  templateUrl: './address-update.component.html',
})
export class AddressUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    addressId: [],
    casualtyId: [],
    street: [],
    countryId: [],
    provinceId: [],
    districtId: [],
  });

  constructor(protected addressService: AddressService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ address }) => {
      this.updateForm(address);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const address = this.createFromForm();
    if (address.addressId !== undefined) {
      this.subscribeToSaveResponse(this.addressService.update(address));
    } else {
      this.subscribeToSaveResponse(this.addressService.create(address));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAddress>>): void {
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

  protected updateForm(address: IAddress): void {
    this.editForm.patchValue({
      addressId: address.addressId,
      casualtyId: address.casualtyId,
      street: address.street,
      countryId: address.countryId,
      provinceId: address.provinceId,
      districtId: address.districtId,
    });
  }

  protected createFromForm(): IAddress {
    return {
      ...new Address(),
      addressId: this.editForm.get(['addressId'])!.value,
      casualtyId: this.editForm.get(['casualtyId'])!.value,
      street: this.editForm.get(['street'])!.value,
      countryId: this.editForm.get(['countryId'])!.value,
      provinceId: this.editForm.get(['provinceId'])!.value,
      districtId: this.editForm.get(['districtId'])!.value,
    };
  }
}
