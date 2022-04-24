import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHumanPopulation, HumanPopulation } from '../human-population.model';
import { HumanPopulationService } from '../service/human-population.service';

@Injectable({ providedIn: 'root' })
export class HumanPopulationRoutingResolveService implements Resolve<IHumanPopulation> {
  constructor(protected service: HumanPopulationService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHumanPopulation> | Observable<never> {
    const id = route.params['humanPopulationId'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((humanPop: HttpResponse<HumanPopulation>) => {
          if (humanPop.body) {
            return of(humanPop.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HumanPopulation());
  }
}
