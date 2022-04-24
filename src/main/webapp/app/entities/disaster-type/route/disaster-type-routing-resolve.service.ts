import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDisasterType, DisasterType } from '../disaster-type.model';
import { DisasterTypeService } from '../service/disaster-type.service';

@Injectable({ providedIn: 'root' })
export class DisasterTypeRoutingResolveService implements Resolve<IDisasterType> {
  constructor(protected service: DisasterTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDisasterType> | Observable<never> {
    const id = route.params['disasterTypeId'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((disasterType: HttpResponse<DisasterType>) => {
          if (disasterType.body) {
            return of(disasterType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DisasterType());
  }
}
