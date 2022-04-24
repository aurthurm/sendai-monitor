import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILiveStockType, LiveStockType } from '../live-stock-type.model';
import { LiveStockTypeService } from '../service/live-stock-type.service';

@Injectable({ providedIn: 'root' })
export class LiveStockTypeRoutingResolveService implements Resolve<ILiveStockType> {
  constructor(protected service: LiveStockTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILiveStockType> | Observable<never> {
    const id = route.params['liveStockTypeId'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((liveStockType: HttpResponse<LiveStockType>) => {
          if (liveStockType.body) {
            return of(liveStockType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LiveStockType());
  }
}
