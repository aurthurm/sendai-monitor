import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHouseholdType } from '../household-type.model';

@Component({
  selector: 'jhi-household-type-detail',
  templateUrl: './household-type-detail.component.html',
})
export class HouseholdTypeDetailComponent implements OnInit {
  householdType: IHouseholdType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ householdType }) => {
      this.householdType = householdType;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
