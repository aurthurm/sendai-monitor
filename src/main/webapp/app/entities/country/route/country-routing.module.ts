import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CountryComponent } from '../list/country.component';
import { CountryDetailComponent } from '../detail/country-detail.component';
import { CountryUpdateComponent } from '../update/country-update.component';
import { CountryRoutingResolveService } from './country-routing-resolve.service';

const countryRoute: Routes = [
  {
    path: '',
    component: CountryComponent,
    data: {
      defaultSort: 'countryId,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':countryId/view',
    component: CountryDetailComponent,
    resolve: {
      country: CountryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CountryUpdateComponent,
    resolve: {
      country: CountryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':countryId/edit',
    component: CountryUpdateComponent,
    resolve: {
      country: CountryRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(countryRoute)],
  exports: [RouterModule],
})
export class CountryRoutingModule {}
