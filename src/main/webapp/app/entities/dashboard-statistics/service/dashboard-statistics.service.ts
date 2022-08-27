import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDashboardStatistics } from '../dashboard-statistics.model';

export type EntityResponseType = HttpResponse<IDashboardStatistics>;
export type EntityArrayResponseType = HttpResponse<IDashboardStatistics[]>;

@Injectable({ providedIn: 'root' })
export class DashboardStatisticsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/dashboard/statistics');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  getHumanPopulationDisasterEffects(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDashboardStatistics[]>(this.resourceUrl +"/human-population-disaster-effects", { params: options, observe: 'response' });
  }

}
