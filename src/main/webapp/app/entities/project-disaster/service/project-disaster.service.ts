import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProjectDisaster, getProjectDisasterIdentifier } from '../project-disaster.model';

export type EntityResponseType = HttpResponse<IProjectDisaster>;
export type EntityArrayResponseType = HttpResponse<IProjectDisaster[]>;

@Injectable({ providedIn: 'root' })
export class ProjectDisasterService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/project-disasters');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(projectDisaster: IProjectDisaster): Observable<EntityResponseType> {    
    return this.http.post<IProjectDisaster>(this.resourceUrl, projectDisaster, { observe: 'response' });
  }

  update(projectDisaster: IProjectDisaster): Observable<EntityResponseType> {
    return this.http.put<IProjectDisaster>(
      `${this.resourceUrl}/${getProjectDisasterIdentifier(projectDisaster) as string}`,
      projectDisaster,
      { observe: 'response' }
    );
  }

  partialUpdate(projectDisaster: IProjectDisaster): Observable<EntityResponseType> {
    return this.http.patch<IProjectDisaster>(
      `${this.resourceUrl}/${getProjectDisasterIdentifier(projectDisaster) as string}`,
      projectDisaster,
      { observe: 'response' }
    );
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IProjectDisaster>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProjectDisaster[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addProjectDisasterToCollectionIfMissing(
    projectDisasterCollection: IProjectDisaster[],
    ...projectDisastersToCheck: (IProjectDisaster | null | undefined)[]
  ): IProjectDisaster[] {
    const projectDisasters: IProjectDisaster[] = projectDisastersToCheck.filter(isPresent);
    if (projectDisasters.length > 0) {
      const projectDisasterCollectionIdentifiers = projectDisasterCollection.map(
        projectDisasterItem => getProjectDisasterIdentifier(projectDisasterItem)!
      );
      const projectDisastersToAdd = projectDisasters.filter(projectDisasterItem => {
        const projectDisasterIdentifier = getProjectDisasterIdentifier(projectDisasterItem);
        if (projectDisasterIdentifier == null || projectDisasterCollectionIdentifiers.includes(projectDisasterIdentifier)) {
          return false;
        }
        projectDisasterCollectionIdentifiers.push(projectDisasterIdentifier);
        return true;
      });
      return [...projectDisastersToAdd, ...projectDisasterCollection];
    }
    return projectDisasterCollection;
  }
}
