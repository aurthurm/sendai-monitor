import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { EntitiesAdminComponent } from './entities-admin.component';
import { entityAdminRoute } from './entities-admin';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(entityAdminRoute)],
  declarations: [EntitiesAdminComponent],
})
export class EntitiesAdminModule {}
