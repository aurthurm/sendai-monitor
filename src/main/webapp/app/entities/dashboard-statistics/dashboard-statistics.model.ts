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


export interface InfrastructureStatisticsList {
  name?: string,
  damaged?: number;
  destroyed?: number | null;
  value?: number | null;
}

export interface InfrastructureStatistics {
  data?: InfrastructureStatisticsList[];
}

export class InfrastructureStatistics implements InfrastructureStatistics {
  constructor(
    public data?: InfrastructureStatisticsList[]
  ) {}
}


