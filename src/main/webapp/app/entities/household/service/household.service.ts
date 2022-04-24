import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHousehold, getHouseholdIdentifier } from '../household.model';

export type EntityResponseType = HttpResponse<IHousehold>;
export type EntityArrayResponseType = HttpResponse<IHousehold[]>;

@Injectable({ providedIn: 'root' })
export class HouseholdService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/households');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(household: IHousehold): Observable<EntityResponseType> {
    return this.http.post<IHousehold>(this.resourceUrl, household, { observe: 'response' });
  }

  update(household: IHousehold): Observable<EntityResponseType> {
    return this.http.put<IHousehold>(`${this.resourceUrl}/${getHouseholdIdentifier(household) as string}`, household, {
      observe: 'response',
    });
  }

  partialUpdate(household: IHousehold): Observable<EntityResponseType> {
    return this.http.patch<IHousehold>(
      `${this.resourceUrl}/${getHouseholdIdentifier(household) as string}`,
      household,
      { observe: 'response' }
    );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IHousehold>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHousehold[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryForDisaster(id: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHousehold[]>(`${this.resourceUrl}/disaster/${id}`, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addHouseholdToCollectionIfMissing(
    householdCollection: IHousehold[],
    ...householdsToCheck: (IHousehold | null | undefined)[]
  ): IHousehold[] {
    const households: IHousehold[] = householdsToCheck.filter(isPresent);
    if (households.length > 0) {
      const householdCollectionIdentifiers = householdCollection.map(
        householdItem => getHouseholdIdentifier(householdItem)!
      );
      const householdsToAdd = households.filter(householdItem => {
        const householdIdentifier = getHouseholdIdentifier(householdItem);
        if (householdIdentifier == null || householdCollectionIdentifiers.includes(householdIdentifier)) {
          return false;
        }
        householdCollectionIdentifiers.push(householdIdentifier);
        return true;
      });
      return [...householdsToAdd, ...householdCollection];
    }
    return householdCollection;
  }
}
