import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CropTypeComponent } from '../list/crop-type.component';
import { CropTypeDetailComponent } from '../detail/crop-type-detail.component';
import { CropTypeUpdateComponent } from '../update/crop-type-update.component';
import { CropTypeRoutingResolveService } from './crop-type-routing-resolve.service';

const cropTypeRoute: Routes = [
  {
    path: '',
    component: CropTypeComponent,
    data: {
      defaultSort: 'cropTypeId,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':cropTypeId/view',
    component: CropTypeDetailComponent,
    resolve: {
      cropType: CropTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CropTypeUpdateComponent,
    resolve: {
      cropType: CropTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':cropTypeId/edit',
    component: CropTypeUpdateComponent,
    resolve: {
      cropType: CropTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cropTypeRoute)],
  exports: [RouterModule],
})
export class CropTypeRoutingModule {}
