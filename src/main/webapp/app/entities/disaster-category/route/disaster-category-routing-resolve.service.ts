import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDisasterCategory, DisasterCategory } from '../disaster-category.model';
import { DisasterCategoryService } from '../service/disaster-category.service';

@Injectable({ providedIn: 'root' })
export class DisasterCategoryRoutingResolveService implements Resolve<IDisasterCategory> {
  constructor(protected service: DisasterCategoryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDisasterCategory> | Observable<never> {
    const id = route.params['disasterCategoryId'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((disasterCategory: HttpResponse<DisasterCategory>) => {
          if (disasterCategory.body) {
            return of(disasterCategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DisasterCategory());
  }
}
