import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IResponseTeam, getResponseTeamIdentifier } from '../response-team.model';

export type EntityResponseType = HttpResponse<IResponseTeam>;
export type EntityArrayResponseType = HttpResponse<IResponseTeam[]>;

@Injectable({ providedIn: 'root' })
export class ResponseTeamService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/response-teams');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(responseTeam: IResponseTeam): Observable<EntityResponseType> {
    return this.http.post<IResponseTeam>(this.resourceUrl, responseTeam, { observe: 'response' });
  }

  update(responseTeam: IResponseTeam): Observable<EntityResponseType> {
    return this.http.put<IResponseTeam>(`${this.resourceUrl}/${getResponseTeamIdentifier(responseTeam) as string}`, responseTeam, {
      observe: 'response',
    });
  }

  partialUpdate(responseTeam: IResponseTeam): Observable<EntityResponseType> {
    return this.http.patch<IResponseTeam>(`${this.resourceUrl}/${getResponseTeamIdentifier(responseTeam) as string}`, responseTeam, {
      observe: 'response',
    });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IResponseTeam>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IResponseTeam[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addResponseTeamToCollectionIfMissing(
    responseTeamCollection: IResponseTeam[],
    ...responseTeamsToCheck: (IResponseTeam | null | undefined)[]
  ): IResponseTeam[] {
    const responseTeams: IResponseTeam[] = responseTeamsToCheck.filter(isPresent);
    if (responseTeams.length > 0) {
      const responseTeamCollectionIdentifiers = responseTeamCollection.map(
        responseTeamItem => getResponseTeamIdentifier(responseTeamItem)!
      );
      const responseTeamsToAdd = responseTeams.filter(responseTeamItem => {
        const responseTeamIdentifier = getResponseTeamIdentifier(responseTeamItem);
        if (responseTeamIdentifier == null || responseTeamCollectionIdentifiers.includes(responseTeamIdentifier)) {
          return false;
        }
        responseTeamCollectionIdentifiers.push(responseTeamIdentifier);
        return true;
      });
      return [...responseTeamsToAdd, ...responseTeamCollection];
    }
    return responseTeamCollection;
  }
}
