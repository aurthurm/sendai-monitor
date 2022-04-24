import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDevelopmentPartner } from '../development-partner.model';

@Component({
  selector: 'jhi-development-partner-detail',
  templateUrl: './development-partner-detail.component.html',
})
export class DevelopmentPartnerDetailComponent implements OnInit {
  developmentPartner: IDevelopmentPartner | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ developmentPartner }) => {
      this.developmentPartner = developmentPartner;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
