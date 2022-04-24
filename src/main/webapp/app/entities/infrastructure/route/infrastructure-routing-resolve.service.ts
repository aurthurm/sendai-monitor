import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IInfrastructure, Infrastructure } from '../infrastructure.model';
import { InfrastructureService } from '../service/infrastructure.service';

@Injectable({ providedIn: 'root' })
export class InfrastructureRoutingResolveService implements Resolve<IInfrastructure> {
  constructor(protected service: InfrastructureService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInfrastructure> | Observable<never> {
    const id = route.params['infractructureId'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((infrastructure: HttpResponse<Infrastructure>) => {
          if (infrastructure.body) {
            return of(infrastructure.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Infrastructure());
  }
}
