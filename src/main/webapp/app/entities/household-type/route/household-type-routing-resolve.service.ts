import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHouseholdType, HouseholdType } from '../household-type.model';
import { HouseholdTypeService } from '../service/household-type.service';

@Injectable({ providedIn: 'root' })
export class HouseholdTypeRoutingResolveService implements Resolve<IHouseholdType> {
  constructor(protected service: HouseholdTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHouseholdType> | Observable<never> {
    const id = route.params['householdTypeId'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((householdType: HttpResponse<HouseholdType>) => {
          if (householdType.body) {
            return of(householdType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HouseholdType());
  }
}
