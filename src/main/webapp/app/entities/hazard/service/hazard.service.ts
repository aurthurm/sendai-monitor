import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHazard, getHazardIdentifier } from '../hazard.model';

export type EntityResponseType = HttpResponse<IHazard>;
export type EntityArrayResponseType = HttpResponse<IHazard[]>;

@Injectable({ providedIn: 'root' })
export class HazardService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/hazards');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(hazard: IHazard): Observable<EntityResponseType> {
    return this.http.post<IHazard>(this.resourceUrl, hazard, { observe: 'response' });
  }

  update(hazard: IHazard): Observable<EntityResponseType> {
    return this.http.put<IHazard>(`${this.resourceUrl}/${getHazardIdentifier(hazard) as string}`, hazard, { observe: 'response' });
  }

  partialUpdate(hazard: IHazard): Observable<EntityResponseType> {
    return this.http.patch<IHazard>(`${this.resourceUrl}/${getHazardIdentifier(hazard) as string}`, hazard, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IHazard>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHazard[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addHazardToCollectionIfMissing(hazardCollection: IHazard[], ...hazardsToCheck: (IHazard | null | undefined)[]): IHazard[] {
    const hazards: IHazard[] = hazardsToCheck.filter(isPresent);
    if (hazards.length > 0) {
      const hazardCollectionIdentifiers = hazardCollection.map(hazardItem => getHazardIdentifier(hazardItem)!);
      const hazardsToAdd = hazards.filter(hazardItem => {
        const hazardIdentifier = getHazardIdentifier(hazardItem);
        if (hazardIdentifier == null || hazardCollectionIdentifiers.includes(hazardIdentifier)) {
          return false;
        }
        hazardCollectionIdentifiers.push(hazardIdentifier);
        return true;
      });
      return [...hazardsToAdd, ...hazardCollection];
    }
    return hazardCollection;
  }
}
