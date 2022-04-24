import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DisasterCategoryComponent } from './list/disaster-category.component';
import { DisasterCategoryDetailComponent } from './detail/disaster-category-detail.component';
import { DisasterCategoryUpdateComponent } from './update/disaster-category-update.component';
import { DisasterCategoryDeleteDialogComponent } from './delete/disaster-category-delete-dialog.component';
import { DisasterCategoryRoutingModule } from './route/disaster-category-routing.module';

@NgModule({
  imports: [SharedModule, DisasterCategoryRoutingModule],
  declarations: [
    DisasterCategoryComponent,
    DisasterCategoryDetailComponent,
    DisasterCategoryUpdateComponent,
    DisasterCategoryDeleteDialogComponent,
  ],
  entryComponents: [DisasterCategoryDeleteDialogComponent],
})
export class DisasterCategoryModule {}
