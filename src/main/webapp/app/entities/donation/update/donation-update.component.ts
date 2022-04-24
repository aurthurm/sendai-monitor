import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDonation, Donation } from '../donation.model';
import { DonationService } from '../service/donation.service';

@Component({
  selector: 'jhi-donation-update',
  templateUrl: './donation-update.component.html',
})
export class DonationUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    donorId: [],
    disasterId: [],
    name: [],
    type: [],
    valueOfDonation: [],
  });

  constructor(protected donationService: DonationService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ donation }) => {
      this.updateForm(donation);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
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
    });
  }

  protected createFromForm(): IDonation {
    return {
      ...new Donation(),
      donorId: this.editForm.get(['donorId'])!.value,
      disasterId: this.editForm.get(['disasterId'])!.value,
      name: this.editForm.get(['name'])!.value,
      type: this.editForm.get(['type'])!.value,
      valueOfDonation: this.editForm.get(['valueOfDonation'])!.value,
    };
  }
}
