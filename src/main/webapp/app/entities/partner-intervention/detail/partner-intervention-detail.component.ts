import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPartnerIntervention } from '../partner-intervention.model';

@Component({
  selector: 'jhi-partner-intervention-detail',
  templateUrl: './partner-intervention-detail.component.html',
})
export class PartnerInterventionDetailComponent implements OnInit {
  partnerIntervention: IPartnerIntervention | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ partnerIntervention }) => {
      this.partnerIntervention = partnerIntervention;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
