import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IIntervention, getInterventionIdentifier } from '../intervention.model';

export type EntityResponseType = HttpResponse<IIntervention>;
export type EntityArrayResponseType = HttpResponse<IIntervention[]>;

@Injectable({ providedIn: 'root' })
export class InterventionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/interventions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(hazard: IIntervention): Observable<EntityResponseType> {
    return this.http.post<IIntervention>(this.resourceUrl, hazard, { observe: 'response' });
  }

  update(hazard: IIntervention): Observable<EntityResponseType> {
    return this.http.put<IIntervention>(`${this.resourceUrl}/${getInterventionIdentifier(hazard) as string}`, hazard, { observe: 'response' });
  }

  partialUpdate(hazard: IIntervention): Observable<EntityResponseType> {
    return this.http.patch<IIntervention>(`${this.resourceUrl}/${getInterventionIdentifier(hazard) as string}`, hazard, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IIntervention>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IIntervention[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
