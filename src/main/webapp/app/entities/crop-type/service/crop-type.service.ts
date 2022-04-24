import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICropType, getCropTypeIdentifier } from '../crop-type.model';

export type EntityResponseType = HttpResponse<ICropType>;
export type EntityArrayResponseType = HttpResponse<ICropType[]>;

@Injectable({ providedIn: 'root' })
export class CropTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crop-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cropType: ICropType): Observable<EntityResponseType> {
    return this.http.post<ICropType>(this.resourceUrl, cropType, { observe: 'response' });
  }

  update(cropType: ICropType): Observable<EntityResponseType> {
    return this.http.put<ICropType>(`${this.resourceUrl}/${getCropTypeIdentifier(cropType) as string}`, cropType, { observe: 'response' });
  }

  partialUpdate(cropType: ICropType): Observable<EntityResponseType> {
    return this.http.patch<ICropType>(`${this.resourceUrl}/${getCropTypeIdentifier(cropType) as string}`, cropType, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ICropType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICropType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCropTypeToCollectionIfMissing(cropTypeCollection: ICropType[], ...cropTypesToCheck: (ICropType | null | undefined)[]): ICropType[] {
    const cropTypes: ICropType[] = cropTypesToCheck.filter(isPresent);
    if (cropTypes.length > 0) {
      const cropTypeCollectionIdentifiers = cropTypeCollection.map(cropTypeItem => getCropTypeIdentifier(cropTypeItem)!);
      const cropTypesToAdd = cropTypes.filter(cropTypeItem => {
        const cropTypeIdentifier = getCropTypeIdentifier(cropTypeItem);
        if (cropTypeIdentifier == null || cropTypeCollectionIdentifiers.includes(cropTypeIdentifier)) {
          return false;
        }
        cropTypeCollectionIdentifiers.push(cropTypeIdentifier);
        return true;
      });
      return [...cropTypesToAdd, ...cropTypeCollection];
    }
    return cropTypeCollection;
  }
}
