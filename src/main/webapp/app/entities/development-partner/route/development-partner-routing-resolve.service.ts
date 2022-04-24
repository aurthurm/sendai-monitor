import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDevelopmentPartner, DevelopmentPartner } from '../development-partner.model';
import { DevelopmentPartnerService } from '../service/development-partner.service';

@Injectable({ providedIn: 'root' })
export class DevelopmentPartnerRoutingResolveService implements Resolve<IDevelopmentPartner> {
  constructor(protected service: DevelopmentPartnerService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDevelopmentPartner> | Observable<never> {
    const id = route.params['partnerId'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((developmentPartner: HttpResponse<DevelopmentPartner>) => {
          if (developmentPartner.body) {
            return of(developmentPartner.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DevelopmentPartner());
  }
}
