import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICasualty, Casualty } from '../casualty.model';
import { CasualtyService } from '../service/casualty.service';

@Injectable({ providedIn: 'root' })
export class CasualtyRoutingResolveService implements Resolve<ICasualty> {
  constructor(protected service: CasualtyService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICasualty> | Observable<never> {
    const id = route.params['casualtyId'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((casualty: HttpResponse<Casualty>) => {
          if (casualty.body) {
            return of(casualty.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Casualty());
  }
}
