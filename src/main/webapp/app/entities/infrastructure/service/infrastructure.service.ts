import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IInfrastructure, getInfrastructureIdentifier } from '../infrastructure.model';

export type EntityResponseType = HttpResponse<IInfrastructure>;
export type EntityArrayResponseType = HttpResponse<IInfrastructure[]>;

@Injectable({ providedIn: 'root' })
export class InfrastructureService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/infrastructures');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(infrastructure: IInfrastructure): Observable<EntityResponseType> {
    return this.http.post<IInfrastructure>(this.resourceUrl, infrastructure, { observe: 'response' });
  }

  update(infrastructure: IInfrastructure): Observable<EntityResponseType> {
    return this.http.put<IInfrastructure>(`${this.resourceUrl}/${getInfrastructureIdentifier(infrastructure) as string}`, infrastructure, {
      observe: 'response',
    });
  }

  partialUpdate(infrastructure: IInfrastructure): Observable<EntityResponseType> {
    return this.http.patch<IInfrastructure>(
      `${this.resourceUrl}/${getInfrastructureIdentifier(infrastructure) as string}`,
      infrastructure,
      { observe: 'response' }
    );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IInfrastructure>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInfrastructure[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryForDisaster(id: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInfrastructure[]>(`${this.resourceUrl}/disaster/${id}`, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addInfrastructureToCollectionIfMissing(
    infrastructureCollection: IInfrastructure[],
    ...infrastructuresToCheck: (IInfrastructure | null | undefined)[]
  ): IInfrastructure[] {
    const infrastructures: IInfrastructure[] = infrastructuresToCheck.filter(isPresent);
    if (infrastructures.length > 0) {
      const infrastructureCollectionIdentifiers = infrastructureCollection.map(
        infrastructureItem => getInfrastructureIdentifier(infrastructureItem)!
      );
      const infrastructuresToAdd = infrastructures.filter(infrastructureItem => {
        const infrastructureIdentifier = getInfrastructureIdentifier(infrastructureItem);
        if (infrastructureIdentifier == null || infrastructureCollectionIdentifiers.includes(infrastructureIdentifier)) {
          return false;
        }
        infrastructureCollectionIdentifiers.push(infrastructureIdentifier);
        return true;
      });
      return [...infrastructuresToAdd, ...infrastructureCollection];
    }
    return infrastructureCollection;
  }
}
