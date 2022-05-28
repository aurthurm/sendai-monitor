import dayjs from 'dayjs/esm';

export interface IReport {
  reportId?: string;
  reportName?: string;
  dateFrom?: dayjs.Dayjs | null;
  dateTo?: dayjs.Dayjs | null;
  fileFormat?: string | null;
  provinceId?: string | null;
  districtId?: string | null;
}

export class Report implements IReport {
  constructor(
    public reportId?: string,
    public reportName?: string,
    public dateFrom?: dayjs.Dayjs | null,
    public dateTo?: dayjs.Dayjs | null,
    public fileFormat?: string | null,
    public provinceId?: string | null,
    public districtId?: string | null
  ) {}
}

export function getReportIdentifier(report: IReport): string | undefined {
  return report.reportId;
}
