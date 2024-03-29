import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IReport } from '../report.model';

export type EntityResponseType = HttpResponse<IReport>;
export type EntityArrayResponseType = HttpResponse<IReport[]>;

@Injectable({ providedIn: 'root' })
export class ReportService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/sendai-monitor');
  protected resourceAggregateUrl = this.applicationConfigService.getEndpointFor('api/sendai-monitor-dcp');
  protected resourceAggregateSendai = this.applicationConfigService.getEndpointFor('api/sendai-monitor-aggregate-target-a');
  protected resourceDonationLineListing = this.applicationConfigService.getEndpointFor('api/donation-line-listing');

  

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  download(type: string, req?: any): Observable<HttpResponse<{}>> {
    const options = createRequestOption(req);
    return this.http.get(`${this.resourceAggregateSendai}/${type}`, {
      params: options, 
      observe: 'response',
      responseType: 'arraybuffer', // 'blob'
    });
  }

  downloadDonationLineList(type: string, req?: any): Observable<HttpResponse<{}>> {
    const options = createRequestOption(req);
    return this.http.get(`${this.resourceDonationLineListing}/${type}`, {
      params: options, 
      observe: 'response',
      responseType: 'arraybuffer', // 'blob'
    });
  }

  downloadAggregate(type: string, id: string, copy: any): Observable<HttpResponse<{}>> {
    return this.http.post(`${this.resourceAggregateUrl+"/"+id}/${type}`, copy, {
      observe: 'response',
      responseType: 'arraybuffer', // 'blob'
    });
  }

  download2(type: string, copy: any): Observable<HttpResponse<{}>> {
    return this.http.post(`${this.resourceUrl}/${type}`, copy, {
      observe: 'response',
      responseType: 'arraybuffer',
    });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReport[]>(this.resourceUrl, { params: options, observe: 'response' });
  }


}
