import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICasualty, getCasualtyIdentifier } from '../casualty.model';

export type EntityResponseType = HttpResponse<ICasualty>;
export type EntityArrayResponseType = HttpResponse<ICasualty[]>;

@Injectable({ providedIn: 'root' })
export class CasualtyService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/casualties');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(casualty: ICasualty): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(casualty);
    return this.http
      .post<ICasualty>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(casualty: ICasualty): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(casualty);
    return this.http
      .put<ICasualty>(`${this.resourceUrl}/${getCasualtyIdentifier(casualty) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(casualty: ICasualty): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(casualty);
    return this.http
      .patch<ICasualty>(`${this.resourceUrl}/${getCasualtyIdentifier(casualty) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<ICasualty>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any, disasterId?: string): Observable<EntityArrayResponseType> {
    const options = createRequestOption({ ...req, disasterId });
    return this.http
      .get<ICasualty[]>( this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCasualtyToCollectionIfMissing(casualtyCollection: ICasualty[], ...casualtiesToCheck: (ICasualty | null | undefined)[]): ICasualty[] {
    const casualties: ICasualty[] = casualtiesToCheck.filter(isPresent);
    if (casualties.length > 0) {
      const casualtyCollectionIdentifiers = casualtyCollection.map(casualtyItem => getCasualtyIdentifier(casualtyItem)!);
      const casualtiesToAdd = casualties.filter(casualtyItem => {
        const casualtyIdentifier = getCasualtyIdentifier(casualtyItem);
        if (casualtyIdentifier == null || casualtyCollectionIdentifiers.includes(casualtyIdentifier)) {
          return false;
        }
        casualtyCollectionIdentifiers.push(casualtyIdentifier);
        return true;
      });
      return [...casualtiesToAdd, ...casualtyCollection];
    }
    return casualtyCollection;
  }

  protected convertDateFromClient(casualty: ICasualty): ICasualty {
    return Object.assign({}, casualty, {
      dob: casualty.dob?.isValid() ? casualty.dob.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dob = res.body.dob ? dayjs(res.body.dob) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((casualty: ICasualty) => {
        casualty.dob = casualty.dob ? dayjs(casualty.dob) : undefined;
      });
    }
    return res;
  }

}
