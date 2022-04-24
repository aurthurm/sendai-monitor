import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ReportDetailComponent } from './detail/report-detail.component';
import { ReportRoutingModule } from './route/report-routing.module';

import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [SharedModule, ReportRoutingModule, PdfViewerModule],
  declarations: [ReportDetailComponent],
  entryComponents: [],
})
export class ReportModule {}
