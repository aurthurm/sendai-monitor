import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInfrastructureType } from '../infrastructure-type.model';

@Component({
  selector: 'jhi-infrastructure-type-detail',
  templateUrl: './infrastructure-type-detail.component.html',
})
export class InfrastructureTypeDetailComponent implements OnInit {
  infrastructureType: IInfrastructureType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ infrastructureType }) => {
      this.infrastructureType = infrastructureType;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
