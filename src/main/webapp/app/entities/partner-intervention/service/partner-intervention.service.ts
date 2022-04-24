import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPartnerIntervention, getPartnerInterventionIdentifier } from '../partner-intervention.model';

export type EntityResponseType = HttpResponse<IPartnerIntervention>;
export type EntityArrayResponseType = HttpResponse<IPartnerIntervention[]>;

@Injectable({ providedIn: 'root' })
export class PartnerInterventionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/partner-interventions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(partnerIntervention: IPartnerIntervention): Observable<EntityResponseType> {
    return this.http.post<IPartnerIntervention>(this.resourceUrl, partnerIntervention, { observe: 'response' });
  }

  update(partnerIntervention: IPartnerIntervention): Observable<EntityResponseType> {
    return this.http.put<IPartnerIntervention>(
      `${this.resourceUrl}/${getPartnerInterventionIdentifier(partnerIntervention) as string}`,
      partnerIntervention,
      { observe: 'response' }
    );
  }

  partialUpdate(partnerIntervention: IPartnerIntervention): Observable<EntityResponseType> {
    return this.http.patch<IPartnerIntervention>(
      `${this.resourceUrl}/${getPartnerInterventionIdentifier(partnerIntervention) as string}`,
      partnerIntervention,
      { observe: 'response' }
    );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IPartnerIntervention>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPartnerIntervention[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPartnerInterventionToCollectionIfMissing(
    partnerInterventionCollection: IPartnerIntervention[],
    ...partnerInterventionsToCheck: (IPartnerIntervention | null | undefined)[]
  ): IPartnerIntervention[] {
    const partnerInterventions: IPartnerIntervention[] = partnerInterventionsToCheck.filter(isPresent);
    if (partnerInterventions.length > 0) {
      const partnerInterventionCollectionIdentifiers = partnerInterventionCollection.map(
        partnerInterventionItem => getPartnerInterventionIdentifier(partnerInterventionItem)!
      );
      const partnerInterventionsToAdd = partnerInterventions.filter(partnerInterventionItem => {
        const partnerInterventionIdentifier = getPartnerInterventionIdentifier(partnerInterventionItem);
        if (partnerInterventionIdentifier == null || partnerInterventionCollectionIdentifiers.includes(partnerInterventionIdentifier)) {
          return false;
        }
        partnerInterventionCollectionIdentifiers.push(partnerInterventionIdentifier);
        return true;
      });
      return [...partnerInterventionsToAdd, ...partnerInterventionCollection];
    }
    return partnerInterventionCollection;
  }
}
