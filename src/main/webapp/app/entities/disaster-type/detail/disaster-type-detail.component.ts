import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDisasterType } from '../disaster-type.model';

@Component({
  selector: 'jhi-disaster-type-detail',
  templateUrl: './disaster-type-detail.component.html',
})
export class DisasterTypeDetailComponent implements OnInit {
  disasterType: IDisasterType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ disasterType }) => {
      this.disasterType = disasterType;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
