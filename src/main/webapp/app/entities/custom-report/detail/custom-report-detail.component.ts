import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import dayjs from 'dayjs/esm';
import { DATE_FORMAT } from 'app/config/input.constants';
import { IReport } from '../custom-report.model';
import { CustomReportService } from '../service/custom-report.service';

@Component({
  selector: 'jhi-custom-report-detail',
  templateUrl: './custom-report-detail.component.html',
})
export class CustomReportDetailComponent implements OnInit {
  report: IReport | null = null;
  pdfSrc: any = null;
  years = ((new Array(new Date().getFullYear() - 2014 + 1).fill(2014)) as number[]).map((item, index) => item + index)

  form = this.fb.group({
    reportName: [],
    dateFrom: [],
    dateTo: [],
    fileFormat: [],
  });

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected reportService: CustomReportService,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ report }) => {
      this.report = report;
    });
  }

  save(): void {
    let data = this.createFromForm();
    data = {
      ...data
    }
    console.log("data.reportName", data); // eslint-disable-line
    
    if(data.reportName==="crop-report"){
      this.reportService.downloadCrops(data?.fileFormat, data).subscribe(res => {
        const buffer: any = res.body;
        const filed = new Blob([buffer], { 
          type: data?.fileFormat === "pdf" ? 'application/pdf' : 'application/vnd.ms-excel'
        });
        const fileURL = URL.createObjectURL(filed);
        if(data?.fileFormat === "pdf"){
          this.pdfSrc = fileURL;
          window.open(fileURL, '', '');
        } else {
          window.open(fileURL, '', '');
        }
      })
    }

    if(data.reportName==="donation-report"){
      this.reportService.downloadDonationLineList(data.fileFormat, data).subscribe(res => {
        const buffer: any = res.body;
        const filed = new Blob([buffer], { 
          type: data?.fileFormat === "pdf" ? 'application/pdf' : 'application/vnd.ms-excel'
        });
        const fileURL = URL.createObjectURL(filed);
        if(data?.fileFormat === "pdf"){
          this.pdfSrc = fileURL;
          window.open(fileURL, '', '');
        } else {
          window.open(fileURL, '', '');
        }
      })
    }
    
  }

  
  
  previousState(): void {
    window.history.back();
  }

  protected updateForm( reportData: any): any {
    this.form.patchValue({
      reportName: reportData.reportName,
      dateFrom: reportData.dateFrom ? reportData.dateFrom.format(DATE_FORMAT) : null,
      dateTo: reportData.dateTo ? reportData.dateTo.format(DATE_FORMAT) : null,
      fileFormat: reportData.fileFormat,
    });
  }

  protected createFromForm(): any {
    return {
      reportName: this.form.get(['reportName'])!.value,
      dateFrom: this.form.get(['dateFrom'])!.value,
      dateTo: this.form.get(['dateTo'])!.value,
      fileFormat: this.form.get(['fileFormat'])!.value
    };
  }

}
