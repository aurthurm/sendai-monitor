import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHousehold } from '../household.model';

@Component({
  selector: 'jhi-household-detail',
  templateUrl: './household-detail.component.html',
})
export class HouseholdDetailComponent implements OnInit {
  household: IHousehold | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ household }) => {
      this.household = household;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
