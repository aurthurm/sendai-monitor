import dayjs from 'dayjs/esm';

export interface IDashboardStatisticsList {
  group?: string;
  count?: number | null;
}

export interface IDashboardStatistics {
  data?: IDashboardStatisticsList[];
}

export class DashboardStatistics implements IDashboardStatistics {
  constructor(
    public data?: IDashboardStatisticsList[]
  ) {}
}


