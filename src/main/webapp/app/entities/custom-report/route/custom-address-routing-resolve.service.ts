import { Injectable } from '@angular/core';
import { Resolve} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomReportRoutingResolveService implements Resolve<{}> {
  constructor() {
    //
  }

  resolve(): Observable<{}> | Observable<never> {
    return of(new Object());
  }
}
