import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDisaster, IDisasterApproval, getDisasterIdentifier, IDisasterIntervention } from '../disaster.model';

export type EntityResponseType = HttpResponse<IDisaster>;
export type EntityArrayResponseType = HttpResponse<IDisaster[]>;

@Injectable({ providedIn: 'root' })
export class DisasterService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/disasters');
  protected treeDataUrl = this.applicationConfigService.getEndpointFor('api/facility-registry-all');
  protected resourceUrldDisasterIntervention = this.applicationConfigService.getEndpointFor('api/disaster-interventions/disater');
  protected resourceApprovalUrl = this.applicationConfigService.getEndpointFor('api/disasterApprovals');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(disaster: IDisaster): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(disaster);
    return this.http
      .post<IDisaster>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(disaster: IDisaster): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(disaster);
    return this.http
      .put<IDisaster>(`${this.resourceUrl}/${getDisasterIdentifier(disaster) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(disaster: IDisaster): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(disaster);
    return this.http
      .patch<IDisaster>(`${this.resourceUrl}/${getDisasterIdentifier(disaster) as string}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IDisaster>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getTreeData(): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(this.treeDataUrl, { observe: 'response' })
  }

  getDisasterIntervention(disasterId: string): Observable<HttpResponse<any>> {
    return this.http
      .get<IDisasterIntervention>(`${this.resourceUrldDisasterIntervention}/${disasterId}`, { observe: 'response' })
  }


  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDisaster[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDisaster[]>(`${this.resourceUrl}/search`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  countSimpleStats(): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(`${this.resourceUrl}/statistics/simple-counts`, { observe: 'response' })
  }

  countDisasterByCategoryStats(): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(`${this.resourceUrl}/statistics/count-group-by-category`, { observe: 'response' })
  }

  countDisasterByTypeStats(): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(`${this.resourceUrl}/statistics/count-group-by-type`, { observe: 'response' })
  }  
  
  saveApproval(approval: IDisasterApproval): Observable<EntityResponseType> {
    return this.http
      .post<IDisasterApproval>(`${this.resourceApprovalUrl}/`, approval, { observe: 'response' });
  }

  approvalsForDisaster(disasterId: string): Observable<HttpResponse<IDisasterApproval[]>> {
    return this.http
      .get<IDisasterApproval[]>(`${this.resourceApprovalUrl}/for-disaster/${disasterId}`, { observe: 'response' })
  }

  addDisasterToCollectionIfMissing(disasterCollection: IDisaster[], ...disastersToCheck: (IDisaster | null | undefined)[]): IDisaster[] {
    const disasters: IDisaster[] = disastersToCheck.filter(isPresent);
    if (disasters.length > 0) {
      const disasterCollectionIdentifiers = disasterCollection.map(disasterItem => getDisasterIdentifier(disasterItem)!);
      const disastersToAdd = disasters.filter(disasterItem => {
        const disasterIdentifier = getDisasterIdentifier(disasterItem);
        if (disasterIdentifier == null || disasterCollectionIdentifiers.includes(disasterIdentifier)) {
          return false;
        }
        disasterCollectionIdentifiers.push(disasterIdentifier);
        return true;
      });
      return [...disastersToAdd, ...disasterCollection];
    }
    return disasterCollection;
  }

  protected convertDateFromClient(disaster: IDisaster): IDisaster {
    return Object.assign({}, disaster, {
      declarationDate: disaster.declarationDate?.isValid() ? disaster.declarationDate.add(1, 'day').toJSON() : undefined,
      closureDate: disaster.closureDate?.isValid() ? disaster.closureDate.add(1, 'day').toJSON() : undefined,
      incidentDate: disaster.incidentDate?.isValid() ? disaster.incidentDate.add(1, 'day').toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.declarationDate = res.body.declarationDate ? dayjs(res.body.declarationDate) : undefined;
      res.body.closureDate = res.body.closureDate ? dayjs(res.body.closureDate) : undefined;
      res.body.incidentDate = res.body.incidentDate ? dayjs(res.body.incidentDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((disaster: IDisaster) => {
        disaster.declarationDate = disaster.declarationDate ? dayjs(disaster.declarationDate) : undefined;
        disaster.closureDate = disaster.closureDate ? dayjs(disaster.closureDate) : undefined;
        disaster.incidentDate = disaster.incidentDate ? dayjs(disaster.incidentDate) : undefined;
      });
    }
    return res;
  }
}
