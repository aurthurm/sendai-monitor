import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IInfrastructureType, InfrastructureType } from '../infrastructure-type.model';
import { InfrastructureTypeService } from '../service/infrastructure-type.service';

@Injectable({ providedIn: 'root' })
export class InfrastructureTypeRoutingResolveService implements Resolve<IInfrastructureType> {
  constructor(protected service: InfrastructureTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInfrastructureType> | Observable<never> {
    const id = route.params['infractructureTypeId'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((infrastructureType: HttpResponse<InfrastructureType>) => {
          if (infrastructureType.body) {
            return of(infrastructureType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new InfrastructureType());
  }
}
