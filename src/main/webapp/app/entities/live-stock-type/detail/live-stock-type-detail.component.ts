import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILiveStockType } from '../live-stock-type.model';

@Component({
  selector: 'jhi-live-stock-type-detail',
  templateUrl: './live-stock-type-detail.component.html',
})
export class LiveStockTypeDetailComponent implements OnInit {
  liveStockType: ILiveStockType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ liveStockType }) => {
      this.liveStockType = liveStockType;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
