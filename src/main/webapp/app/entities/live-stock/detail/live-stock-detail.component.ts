import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILiveStock } from '../live-stock.model';

@Component({
  selector: 'jhi-live-stock-detail',
  templateUrl: './live-stock-detail.component.html',
})
export class LiveStockDetailComponent implements OnInit {
  liveStock: ILiveStock | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ liveStock }) => {
      this.liveStock = liveStock;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
