import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHouseholdType, getHouseholdTypeIdentifier } from '../household-type.model';

export type EntityResponseType = HttpResponse<IHouseholdType>;
export type EntityArrayResponseType = HttpResponse<IHouseholdType[]>;

@Injectable({ providedIn: 'root' })
export class HouseholdTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/household-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(householdType: IHouseholdType): Observable<EntityResponseType> {
    return this.http.post<IHouseholdType>(this.resourceUrl, householdType, { observe: 'response' });
  }

  update(householdType: IHouseholdType): Observable<EntityResponseType> {
    return this.http.put<IHouseholdType>(`${this.resourceUrl}/${getHouseholdTypeIdentifier(householdType) as string}`, householdType, { observe: 'response' });
  }

  partialUpdate(householdType: IHouseholdType): Observable<EntityResponseType> {
    return this.http.patch<IHouseholdType>(`${this.resourceUrl}/${getHouseholdTypeIdentifier(householdType) as string}`, householdType, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IHouseholdType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHouseholdType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addHouseholdTypeToCollectionIfMissing(householdTypeCollection: IHouseholdType[], ...householdTypesToCheck: (IHouseholdType | null | undefined)[]): IHouseholdType[] {
    const householdTypes: IHouseholdType[] = householdTypesToCheck.filter(isPresent);
    if (householdTypes.length > 0) {
      const householdTypeCollectionIdentifiers = householdTypeCollection.map(householdTypeItem => getHouseholdTypeIdentifier(householdTypeItem)!);
      const householdTypesToAdd = householdTypes.filter(householdTypeItem => {
        const householdTypeIdentifier = getHouseholdTypeIdentifier(householdTypeItem);
        if (householdTypeIdentifier == null || householdTypeCollectionIdentifiers.includes(householdTypeIdentifier)) {
          return false;
        }
        householdTypeCollectionIdentifiers.push(householdTypeIdentifier);
        return true;
      });
      return [...householdTypesToAdd, ...householdTypeCollection];
    }
    return householdTypeCollection;
  }
}
