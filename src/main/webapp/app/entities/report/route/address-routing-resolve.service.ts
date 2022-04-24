import { Injectable } from '@angular/core';
import { Resolve} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportRoutingResolveService implements Resolve<{}> {
  constructor() {
    //
  }

  resolve(): Observable<{}> | Observable<never> {
    return of(new Object());
  }
}
