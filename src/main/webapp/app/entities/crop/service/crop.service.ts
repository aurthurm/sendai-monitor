import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICrop, getCropIdentifier } from '../crop.model';

export type EntityResponseType = HttpResponse<ICrop>;
export type EntityArrayResponseType = HttpResponse<ICrop[]>;

@Injectable({ providedIn: 'root' })
export class CropService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crops');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crop: ICrop): Observable<EntityResponseType> {
    return this.http.post<ICrop>(this.resourceUrl, crop, { observe: 'response' });
  }

  update(crop: ICrop): Observable<EntityResponseType> {
    return this.http.put<ICrop>(`${this.resourceUrl}/${getCropIdentifier(crop) as string}`, crop, { observe: 'response' });
  }

  partialUpdate(crop: ICrop): Observable<EntityResponseType> {
    return this.http.patch<ICrop>(`${this.resourceUrl}/${getCropIdentifier(crop) as string}`, crop, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ICrop>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrop[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryForDisaster(id: string, req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrop[]>(`${this.resourceUrl}/disaster/${id}`, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCropToCollectionIfMissing(cropCollection: ICrop[], ...cropsToCheck: (ICrop | null | undefined)[]): ICrop[] {
    const crops: ICrop[] = cropsToCheck.filter(isPresent);
    if (crops.length > 0) {
      const cropCollectionIdentifiers = cropCollection.map(cropItem => getCropIdentifier(cropItem)!);
      const cropsToAdd = crops.filter(cropItem => {
        const cropIdentifier = getCropIdentifier(cropItem);
        if (cropIdentifier == null || cropCollectionIdentifiers.includes(cropIdentifier)) {
          return false;
        }
        cropCollectionIdentifiers.push(cropIdentifier);
        return true;
      });
      return [...cropsToAdd, ...cropCollection];
    }
    return cropCollection;
  }
}
