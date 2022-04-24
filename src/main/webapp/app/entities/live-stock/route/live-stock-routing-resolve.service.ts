import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILiveStock, LiveStock } from '../live-stock.model';
import { LiveStockService } from '../service/live-stock.service';

@Injectable({ providedIn: 'root' })
export class LiveStockRoutingResolveService implements Resolve<ILiveStock> {
  constructor(protected service: LiveStockService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILiveStock> | Observable<never> {
    const id = route.params['liveStockId'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((liveStock: HttpResponse<LiveStock>) => {
          if (liveStock.body) {
            return of(liveStock.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LiveStock());
  }
}
