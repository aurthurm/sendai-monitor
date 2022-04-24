import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHazard, Hazard } from '../hazard.model';
import { HazardService } from '../service/hazard.service';

@Injectable({ providedIn: 'root' })
export class HazardRoutingResolveService implements Resolve<IHazard> {
  constructor(protected service: HazardService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHazard> | Observable<never> {
    const id = route.params['hazardId'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((hazard: HttpResponse<Hazard>) => {
          if (hazard.body) {
            return of(hazard.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Hazard());
  }
}
