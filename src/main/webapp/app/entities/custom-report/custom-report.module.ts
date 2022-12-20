import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CustomReportDetailComponent } from './detail/custom-report-detail.component';
import { CustomReportRoutingModule } from './route/custom-report-routing.module';

import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [SharedModule, CustomReportRoutingModule, PdfViewerModule],
  declarations: [CustomReportDetailComponent],
  entryComponents: [],
})
export class CustomReportModule {}
