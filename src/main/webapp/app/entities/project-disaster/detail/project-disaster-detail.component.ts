import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProjectDisaster } from '../project-disaster.model';

@Component({
  selector: 'jhi-project-disaster-detail',
  templateUrl: './project-disaster-detail.component.html',
})
export class ProjectDisasterDetailComponent implements OnInit {
  projectDisaster: IProjectDisaster | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ projectDisaster }) => {
      this.projectDisaster = projectDisaster;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
