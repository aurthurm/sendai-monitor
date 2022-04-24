import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDisasterCategory, getDisasterCategoryIdentifier } from '../disaster-category.model';

export type EntityResponseType = HttpResponse<IDisasterCategory>;
export type EntityArrayResponseType = HttpResponse<IDisasterCategory[]>;

@Injectable({ providedIn: 'root' })
export class DisasterCategoryService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/disaster-categories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(disasterCategory: IDisasterCategory): Observable<EntityResponseType> {
    return this.http.post<IDisasterCategory>(this.resourceUrl, disasterCategory, { observe: 'response' });
  }

  update(disasterCategory: IDisasterCategory): Observable<EntityResponseType> {
    return this.http.put<IDisasterCategory>(
      `${this.resourceUrl}/${getDisasterCategoryIdentifier(disasterCategory) as string}`,
      disasterCategory,
      { observe: 'response' }
    );
  }

  partialUpdate(disasterCategory: IDisasterCategory): Observable<EntityResponseType> {
    return this.http.patch<IDisasterCategory>(
      `${this.resourceUrl}/${getDisasterCategoryIdentifier(disasterCategory) as string}`,
      disasterCategory,
      { observe: 'response' }
    );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IDisasterCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDisasterCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDisasterCategoryToCollectionIfMissing(
    disasterCategoryCollection: IDisasterCategory[],
    ...disasterCategoriesToCheck: (IDisasterCategory | null | undefined)[]
  ): IDisasterCategory[] {
    const disasterCategories: IDisasterCategory[] = disasterCategoriesToCheck.filter(isPresent);
    if (disasterCategories.length > 0) {
      const disasterCategoryCollectionIdentifiers = disasterCategoryCollection.map(
        disasterCategoryItem => getDisasterCategoryIdentifier(disasterCategoryItem)!
      );
      const disasterCategoriesToAdd = disasterCategories.filter(disasterCategoryItem => {
        const disasterCategoryIdentifier = getDisasterCategoryIdentifier(disasterCategoryItem);
        if (disasterCategoryIdentifier == null || disasterCategoryCollectionIdentifiers.includes(disasterCategoryIdentifier)) {
          return false;
        }
        disasterCategoryCollectionIdentifiers.push(disasterCategoryIdentifier);
        return true;
      });
      return [...disasterCategoriesToAdd, ...disasterCategoryCollection];
    }
    return disasterCategoryCollection;
  }
}
