import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILiveStock, getLiveStockIdentifier } from '../live-stock.model';

export type EntityResponseType = HttpResponse<ILiveStock>;
export type EntityArrayResponseType = HttpResponse<ILiveStock[]>;

@Injectable({ providedIn: 'root' })
export class LiveStockService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/live-stocks');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  createMultipleLiveStocks(liveStock: ILiveStock,): Observable<EntityResponseType> {
    return this.http.post<ILiveStock>(this.resourceUrl + '/save-multiple-live-stocks', liveStock, { observe: 'response' });
  }

  create(liveStock: ILiveStock): Observable<EntityResponseType> {
    return this.http.post<ILiveStock>(this.resourceUrl, liveStock, { observe: 'response' });
  }

  update(liveStock: ILiveStock): Observable<EntityResponseType> {
    return this.http.put<ILiveStock>(`${this.resourceUrl}/${getLiveStockIdentifier(liveStock) as string}`, liveStock, {
      observe: 'response',
    });
  }

  partialUpdate(liveStock: ILiveStock): Observable<EntityResponseType> {
    return this.http.patch<ILiveStock>(`${this.resourceUrl}/${getLiveStockIdentifier(liveStock) as string}`, liveStock, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ILiveStock>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILiveStock[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryForDisaster(id: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILiveStock[]>(`${this.resourceUrl}/disaster/${id}`, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addLiveStockToCollectionIfMissing(
    liveStockCollection: ILiveStock[],
    ...liveStocksToCheck: (ILiveStock | null | undefined)[]
  ): ILiveStock[] {
    const liveStocks: ILiveStock[] = liveStocksToCheck.filter(isPresent);
    if (liveStocks.length > 0) {
      const liveStockCollectionIdentifiers = liveStockCollection.map(liveStockItem => getLiveStockIdentifier(liveStockItem)!);
      const liveStocksToAdd = liveStocks.filter(liveStockItem => {
        const liveStockIdentifier = getLiveStockIdentifier(liveStockItem);
        if (liveStockIdentifier == null || liveStockCollectionIdentifiers.includes(liveStockIdentifier)) {
          return false;
        }
        liveStockCollectionIdentifiers.push(liveStockIdentifier);
        return true;
      });
      return [...liveStocksToAdd, ...liveStockCollection];
    }
    return liveStockCollection;
  }
}
