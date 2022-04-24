import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICropType } from '../crop-type.model';

@Component({
  selector: 'jhi-crop-type-detail',
  templateUrl: './crop-type-detail.component.html',
})
export class CropTypeDetailComponent implements OnInit {
  cropType: ICropType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cropType }) => {
      this.cropType = cropType;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
