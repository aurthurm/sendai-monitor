import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProjectDisaster, ProjectDisaster } from '../project-disaster.model';
import { ProjectDisasterService } from '../service/project-disaster.service';

@Injectable({ providedIn: 'root' })
export class ProjectDisasterRoutingResolveService implements Resolve<IProjectDisaster> {
  constructor(protected service: ProjectDisasterService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProjectDisaster> | Observable<never> {
    const id = route.params['projectDisasterId'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((projectDisaster: HttpResponse<ProjectDisaster>) => {
          if (projectDisaster.body) {
            return of(projectDisaster.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProjectDisaster());
  }
}
