import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { IReport } from '../report.model';
import { ReportService } from '../service/report.service';

@Component({
  selector: 'jhi-report-detail',
  templateUrl: './report-detail.component.html',
})
export class ReportDetailComponent implements OnInit {
  report: IReport | null = null;
  pdfSrc: any = null;
  years = ((new Array(new Date().getFullYear() - 2014 + 1).fill(2014)) as number[]).map((item, index) => item + index)

  form = this.fb.group({
    reportName: ['',],
    startDate: ['',],
    endDate: ['',],
    fileType: ['',],
  });

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected reportService: ReportService,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ report }) => {
      this.report = report;
    });
  }

  save(): void {
    const data = this.createFromForm();
    this.reportService.download(data?.fileType, data).subscribe(res => {
      const buffer: any = res.body;
      const filed = new Blob([buffer], { 
        type: data?.fileType === "pdf" ? 'application/pdf' : 'application/vnd.ms-excel'
      });
      const fileURL = URL.createObjectURL(filed);
      if(data?.fileType === "pdf"){
        this.pdfSrc = fileURL;
        window.open(fileURL, '', '');
      } else {
        window.open(fileURL, '', '');
      }
    })
  }
  
  previousState(): void {
    window.history.back();
  }

  protected updateForm( reportData: any): any {
    this.form.patchValue({
      reportName: reportData.reportName,
      startDate: reportData.startDate,
      endDate: reportData.endDate,
      fileType: reportData.fileType,
    });
  }

  protected createFromForm(): any {
    return {
      reportName: this.form.get(['reportName'])!.value,
      startDate: this.form.get(['startDate'])!.value,
      endDate: this.form.get(['endDate'])!.value,
      fileType: this.form.get(['fileType'])!.value
    };
  }

}
