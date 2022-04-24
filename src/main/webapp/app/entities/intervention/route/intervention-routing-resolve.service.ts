import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IIntervention, Intervention } from '../intervention.model';
import { InterventionService } from '../service/Intervention.service';

@Injectable({ providedIn: 'root' })
export class InterventionRoutingResolveService implements Resolve<IIntervention> {
  constructor(protected service: InterventionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IIntervention> | Observable<never> {
    const id = route.params['interventionId'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((Intervention: HttpResponse<Intervention>) => {
          if (Intervention.body) {
            return of(Intervention.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Intervention());
  }
}
