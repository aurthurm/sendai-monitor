import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDisasterType, getDisasterTypeIdentifier } from '../disaster-type.model';

export type EntityResponseType = HttpResponse<IDisasterType>;
export type EntityArrayResponseType = HttpResponse<IDisasterType[]>;

@Injectable({ providedIn: 'root' })
export class DisasterTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/disaster-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(disasterType: IDisasterType): Observable<EntityResponseType> {
    return this.http.post<IDisasterType>(this.resourceUrl, disasterType, { observe: 'response' });
  }

  update(disasterType: IDisasterType): Observable<EntityResponseType> {
    return this.http.put<IDisasterType>(`${this.resourceUrl}/${getDisasterTypeIdentifier(disasterType) as string}`, disasterType, {
      observe: 'response',
    });
  }

  partialUpdate(disasterType: IDisasterType): Observable<EntityResponseType> {
    return this.http.patch<IDisasterType>(`${this.resourceUrl}/${getDisasterTypeIdentifier(disasterType) as string}`, disasterType, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IDisasterType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDisasterType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDisasterTypeToCollectionIfMissing(
    disasterTypeCollection: IDisasterType[],
    ...disasterTypesToCheck: (IDisasterType | null | undefined)[]
  ): IDisasterType[] {
    const disasterTypes: IDisasterType[] = disasterTypesToCheck.filter(isPresent);
    if (disasterTypes.length > 0) {
      const disasterTypeCollectionIdentifiers = disasterTypeCollection.map(
        disasterTypeItem => getDisasterTypeIdentifier(disasterTypeItem)!
      );
      const disasterTypesToAdd = disasterTypes.filter(disasterTypeItem => {
        const disasterTypeIdentifier = getDisasterTypeIdentifier(disasterTypeItem);
        if (disasterTypeIdentifier == null || disasterTypeCollectionIdentifiers.includes(disasterTypeIdentifier)) {
          return false;
        }
        disasterTypeCollectionIdentifiers.push(disasterTypeIdentifier);
        return true;
      });
      return [...disasterTypesToAdd, ...disasterTypeCollection];
    }
    return disasterTypeCollection;
  }
}
