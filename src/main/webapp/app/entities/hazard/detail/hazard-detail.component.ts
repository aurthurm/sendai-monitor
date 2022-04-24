import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHazard } from '../hazard.model';

@Component({
  selector: 'jhi-hazard-detail',
  templateUrl: './hazard-detail.component.html',
})
export class HazardDetailComponent implements OnInit {
  hazard: IHazard | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hazard }) => {
      this.hazard = hazard;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
