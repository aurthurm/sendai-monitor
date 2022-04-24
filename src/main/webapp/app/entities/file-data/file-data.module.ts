import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { FileDataUploadComponent } from './upload/file-data-upload.component';
import { FileDataComponent } from './list/file-data.component';
import { FileDataRoutingModule } from './route/file-data-routing.module';

@NgModule({
  imports: [SharedModule, FileDataRoutingModule],
  declarations: [FileDataUploadComponent,FileDataComponent],
  exports: [FileDataUploadComponent,FileDataComponent],
})
export class FileDataModule {}
