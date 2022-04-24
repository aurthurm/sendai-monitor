export interface IReport {
  reportId?: string;
  casualtyId?: string | null;
  street?: string | null;
  countryId?: string | null;
  provinceId?: string | null;
  districtId?: string | null;
}

export class Report implements IReport {
  constructor(
    public reportId?: string,
    public casualtyId?: string | null,
    public street?: string | null,
    public countryId?: string | null,
    public provinceId?: string | null,
    public districtId?: string | null
  ) {}
}

export function getReportIdentifier(report: IReport): string | undefined {
  return report.reportId;
}
