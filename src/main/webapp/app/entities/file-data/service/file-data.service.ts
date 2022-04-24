import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFileData } from '../file-data.model';

export type EntityResponseType = HttpResponse<IFileData>;
export type EntityArrayResponseType = HttpResponse<IFileData[]>;

@Injectable({ providedIn: 'root' })
export class FileDataService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/file-data');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  upload(formData: FormData, disasterId: string): Observable<EntityResponseType> {
    return this.http.post<IFileData>(`${this.resourceUrl}/${disasterId}`, formData, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IFileData>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<any[]>> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
