import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICasualty } from '../casualty.model';
import { IDisaster } from 'app/entities/disaster/disaster.model';
import { DisasterService } from 'app/entities/disaster/service/disaster.service';

@Component({
  selector: 'jhi-casualty-detail',
  templateUrl: './casualty-detail.component.html',
  styleUrls: ['../casualty.scss'],
})
export class CasualtyDetailComponent implements OnInit {
  casualty: ICasualty | null = null;
  disaster: IDisaster | null = null;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected disasterService: DisasterService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ casualty }) => {
      this.casualty = casualty;

      this.disasterService.find(casualty.disasterId).subscribe(res => {
        if(res.body){
          this.disaster = res.body;
        }
      })

    });
  }

  previousState(): void {
    window.history.back();
  }
}
