import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDevelopmentPartner, getDevelopmentPartnerIdentifier } from '../development-partner.model';

export type EntityResponseType = HttpResponse<IDevelopmentPartner>;
export type EntityArrayResponseType = HttpResponse<IDevelopmentPartner[]>;

@Injectable({ providedIn: 'root' })
export class DevelopmentPartnerService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/development-partners');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(developmentPartner: IDevelopmentPartner): Observable<EntityResponseType> {
    return this.http.post<IDevelopmentPartner>(this.resourceUrl, developmentPartner, { observe: 'response' });
  }

  update(developmentPartner: IDevelopmentPartner): Observable<EntityResponseType> {
    return this.http.put<IDevelopmentPartner>(
      `${this.resourceUrl}/${getDevelopmentPartnerIdentifier(developmentPartner) as string}`,
      developmentPartner,
      { observe: 'response' }
    );
  }

  partialUpdate(developmentPartner: IDevelopmentPartner): Observable<EntityResponseType> {
    return this.http.patch<IDevelopmentPartner>(
      `${this.resourceUrl}/${getDevelopmentPartnerIdentifier(developmentPartner) as string}`,
      developmentPartner,
      { observe: 'response' }
    );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IDevelopmentPartner>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDevelopmentPartner[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDevelopmentPartnerToCollectionIfMissing(
    developmentPartnerCollection: IDevelopmentPartner[],
    ...developmentPartnersToCheck: (IDevelopmentPartner | null | undefined)[]
  ): IDevelopmentPartner[] {
    const developmentPartners: IDevelopmentPartner[] = developmentPartnersToCheck.filter(isPresent);
    if (developmentPartners.length > 0) {
      const developmentPartnerCollectionIdentifiers = developmentPartnerCollection.map(
        developmentPartnerItem => getDevelopmentPartnerIdentifier(developmentPartnerItem)!
      );
      const developmentPartnersToAdd = developmentPartners.filter(developmentPartnerItem => {
        const developmentPartnerIdentifier = getDevelopmentPartnerIdentifier(developmentPartnerItem);
        if (developmentPartnerIdentifier == null || developmentPartnerCollectionIdentifiers.includes(developmentPartnerIdentifier)) {
          return false;
        }
        developmentPartnerCollectionIdentifiers.push(developmentPartnerIdentifier);
        return true;
      });
      return [...developmentPartnersToAdd, ...developmentPartnerCollection];
    }
    return developmentPartnerCollection;
  }
}
