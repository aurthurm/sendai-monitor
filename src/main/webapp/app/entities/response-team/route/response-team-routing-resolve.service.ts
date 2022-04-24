import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IResponseTeam, ResponseTeam } from '../response-team.model';
import { ResponseTeamService } from '../service/response-team.service';

@Injectable({ providedIn: 'root' })
export class ResponseTeamRoutingResolveService implements Resolve<IResponseTeam> {
  constructor(protected service: ResponseTeamService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IResponseTeam> | Observable<never> {
    const id = route.params['responseTeamId'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((responseTeam: HttpResponse<ResponseTeam>) => {
          if (responseTeam.body) {
            return of(responseTeam.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ResponseTeam());
  }
}
