import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDisasterCategory } from '../disaster-category.model';

@Component({
  selector: 'jhi-disaster-category-detail',
  templateUrl: './disaster-category-detail.component.html',
})
export class DisasterCategoryDetailComponent implements OnInit {
  disasterCategory: IDisasterCategory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ disasterCategory }) => {
      this.disasterCategory = disasterCategory;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
