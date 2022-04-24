import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHousehold, Household } from '../household.model';
import { HouseholdService } from '../service/household.service';

@Injectable({ providedIn: 'root' })
export class HouseholdRoutingResolveService implements Resolve<IHousehold> {
  constructor(protected service: HouseholdService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHousehold> | Observable<never> {
    const id = route.params['householdId'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((household: HttpResponse<Household>) => {
          if (household.body) {
            return of(household.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Household());
  }
}
