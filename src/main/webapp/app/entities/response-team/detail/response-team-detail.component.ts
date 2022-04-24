import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IResponseTeam } from '../response-team.model';

@Component({
  selector: 'jhi-response-team-detail',
  templateUrl: './response-team-detail.component.html',
})
export class ResponseTeamDetailComponent implements OnInit {
  responseTeam: IResponseTeam | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ responseTeam }) => {
      this.responseTeam = responseTeam;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
