import { Route } from '@angular/router';

import { NavAsideComponent } from './navaside.component';

export const navasideRoute: Route = {
  path: '',
  component: NavAsideComponent,
  outlet: 'navaside',
};
