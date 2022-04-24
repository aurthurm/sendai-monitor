import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHumanPopulation, getHumanPopulationIdentifier } from '../human-population.model';

export type EntityResponseType = HttpResponse<IHumanPopulation>;
export type EntityArrayResponseType = HttpResponse<IHumanPopulation[]>;

@Injectable({ providedIn: 'root' })
export class HumanPopulationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/human-populations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(humanPop: IHumanPopulation): Observable<EntityResponseType> {
    return this.http.post<IHumanPopulation>(this.resourceUrl, humanPop, { observe: 'response' });
  }

  update(humanPop: IHumanPopulation): Observable<EntityResponseType> {
    return this.http.put<IHumanPopulation>(`${this.resourceUrl}/${getHumanPopulationIdentifier(humanPop) as string}`, humanPop, { observe: 'response' });
  }

  partialUpdate(humanPop: IHumanPopulation): Observable<EntityResponseType> {
    return this.http.patch<IHumanPopulation>(`${this.resourceUrl}/${getHumanPopulationIdentifier(humanPop) as string}`, humanPop, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IHumanPopulation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHumanPopulation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryForDisaster(id: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHumanPopulation[]>(`${this.resourceUrl}/disaster/${id}`, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addHumanPopulationToCollectionIfMissing(humanPopCollection: IHumanPopulation[], ...humanPopsToCheck: (IHumanPopulation | null | undefined)[]): IHumanPopulation[] {
    const humanPops: IHumanPopulation[] = humanPopsToCheck.filter(isPresent);
    if (humanPops.length > 0) {
      const humanPopCollectionIdentifiers = humanPopCollection.map(humanPopItem => getHumanPopulationIdentifier(humanPopItem)!);
      const humanPopsToAdd = humanPops.filter(humanPopItem => {
        const humanPopIdentifier = getHumanPopulationIdentifier(humanPopItem);
        if (humanPopIdentifier == null || humanPopCollectionIdentifiers.includes(humanPopIdentifier)) {
          return false;
        }
        humanPopCollectionIdentifiers.push(humanPopIdentifier);
        return true;
      });
      return [...humanPopsToAdd, ...humanPopCollection];
    }
    return humanPopCollection;
  }
}
