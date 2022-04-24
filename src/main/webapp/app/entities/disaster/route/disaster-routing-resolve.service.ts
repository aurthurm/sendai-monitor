import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDisaster, Disaster } from '../disaster.model';
import { DisasterService } from '../service/disaster.service';

@Injectable({ providedIn: 'root' })
export class DisasterRoutingResolveService implements Resolve<IDisaster> {
  constructor(protected service: DisasterService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDisaster> | Observable<never> {
    const id = route.params['disasterId'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((disaster: HttpResponse<Disaster>) => {
          if (disaster.body) {
            return of(disaster.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Disaster());
  }
}
