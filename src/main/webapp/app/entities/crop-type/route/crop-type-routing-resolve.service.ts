import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICropType, CropType } from '../crop-type.model';
import { CropTypeService } from '../service/crop-type.service';

@Injectable({ providedIn: 'root' })
export class CropTypeRoutingResolveService implements Resolve<ICropType> {
  constructor(protected service: CropTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICropType> | Observable<never> {
    const id = route.params['cropTypeId'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cropType: HttpResponse<CropType>) => {
          if (cropType.body) {
            return of(cropType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CropType());
  }
}
