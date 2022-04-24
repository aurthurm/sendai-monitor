import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPartnerIntervention, PartnerIntervention } from '../partner-intervention.model';
import { PartnerInterventionService } from '../service/partner-intervention.service';

@Injectable({ providedIn: 'root' })
export class PartnerInterventionRoutingResolveService implements Resolve<IPartnerIntervention> {
  constructor(protected service: PartnerInterventionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPartnerIntervention> | Observable<never> {
    const id = route.params['inteventionId'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((partnerIntervention: HttpResponse<PartnerIntervention>) => {
          if (partnerIntervention.body) {
            return of(partnerIntervention.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PartnerIntervention());
  }
}
