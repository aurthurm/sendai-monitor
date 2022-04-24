import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IInfrastructureType, getInfrastructureTypeIdentifier } from '../infrastructure-type.model';

export type EntityResponseType = HttpResponse<IInfrastructureType>;
export type EntityArrayResponseType = HttpResponse<IInfrastructureType[]>;

@Injectable({ providedIn: 'root' })
export class InfrastructureTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/infrastructure-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(infrastructureType: IInfrastructureType): Observable<EntityResponseType> {
    return this.http.post<IInfrastructureType>(this.resourceUrl, infrastructureType, { observe: 'response' });
  }

  update(infrastructureType: IInfrastructureType): Observable<EntityResponseType> {
    return this.http.put<IInfrastructureType>(
      `${this.resourceUrl}/${getInfrastructureTypeIdentifier(infrastructureType) as string}`,
      infrastructureType,
      { observe: 'response' }
    );
  }

  partialUpdate(infrastructureType: IInfrastructureType): Observable<EntityResponseType> {
    return this.http.patch<IInfrastructureType>(
      `${this.resourceUrl}/${getInfrastructureTypeIdentifier(infrastructureType) as string}`,
      infrastructureType,
      { observe: 'response' }
    );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IInfrastructureType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInfrastructureType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addInfrastructureTypeToCollectionIfMissing(
    infrastructureTypeCollection: IInfrastructureType[],
    ...infrastructureTypesToCheck: (IInfrastructureType | null | undefined)[]
  ): IInfrastructureType[] {
    const infrastructureTypes: IInfrastructureType[] = infrastructureTypesToCheck.filter(isPresent);
    if (infrastructureTypes.length > 0) {
      const infrastructureTypeCollectionIdentifiers = infrastructureTypeCollection.map(
        infrastructureTypeItem => getInfrastructureTypeIdentifier(infrastructureTypeItem)!
      );
      const infrastructureTypesToAdd = infrastructureTypes.filter(infrastructureTypeItem => {
        const infrastructureTypeIdentifier = getInfrastructureTypeIdentifier(infrastructureTypeItem);
        if (infrastructureTypeIdentifier == null || infrastructureTypeCollectionIdentifiers.includes(infrastructureTypeIdentifier)) {
          return false;
        }
        infrastructureTypeCollectionIdentifiers.push(infrastructureTypeIdentifier);
        return true;
      });
      return [...infrastructureTypesToAdd, ...infrastructureTypeCollection];
    }
    return infrastructureTypeCollection;
  }
}
