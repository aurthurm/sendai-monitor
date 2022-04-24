import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILiveStockType, getLiveStockTypeIdentifier } from '../live-stock-type.model';

export type EntityResponseType = HttpResponse<ILiveStockType>;
export type EntityArrayResponseType = HttpResponse<ILiveStockType[]>;

@Injectable({ providedIn: 'root' })
export class LiveStockTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/live-stock-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(liveStockType: ILiveStockType): Observable<EntityResponseType> {
    return this.http.post<ILiveStockType>(this.resourceUrl, liveStockType, { observe: 'response' });
  }

  update(liveStockType: ILiveStockType): Observable<EntityResponseType> {
    return this.http.put<ILiveStockType>(`${this.resourceUrl}/${getLiveStockTypeIdentifier(liveStockType) as string}`, liveStockType, {
      observe: 'response',
    });
  }

  partialUpdate(liveStockType: ILiveStockType): Observable<EntityResponseType> {
    return this.http.patch<ILiveStockType>(`${this.resourceUrl}/${getLiveStockTypeIdentifier(liveStockType) as string}`, liveStockType, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ILiveStockType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILiveStockType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addLiveStockTypeToCollectionIfMissing(
    liveStockTypeCollection: ILiveStockType[],
    ...liveStockTypesToCheck: (ILiveStockType | null | undefined)[]
  ): ILiveStockType[] {
    const liveStockTypes: ILiveStockType[] = liveStockTypesToCheck.filter(isPresent);
    if (liveStockTypes.length > 0) {
      const liveStockTypeCollectionIdentifiers = liveStockTypeCollection.map(
        liveStockTypeItem => getLiveStockTypeIdentifier(liveStockTypeItem)!
      );
      const liveStockTypesToAdd = liveStockTypes.filter(liveStockTypeItem => {
        const liveStockTypeIdentifier = getLiveStockTypeIdentifier(liveStockTypeItem);
        if (liveStockTypeIdentifier == null || liveStockTypeCollectionIdentifiers.includes(liveStockTypeIdentifier)) {
          return false;
        }
        liveStockTypeCollectionIdentifiers.push(liveStockTypeIdentifier);
        return true;
      });
      return [...liveStockTypesToAdd, ...liveStockTypeCollection];
    }
    return liveStockTypeCollection;
  }
}
