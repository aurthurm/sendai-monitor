import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFileData, FileData } from '../file-data.model';
import { FileDataService } from '../service/file-data.service';

@Injectable({ providedIn: 'root' })
export class FileDataRoutingResolveService implements Resolve<IFileData> {
  constructor(protected service: FileDataService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFileData> | Observable<never> {
    const id = route.params['fileId'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((fileData: HttpResponse<FileData>) => {
          if (fileData.body) {
            return of(fileData.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FileData());
  }
}
