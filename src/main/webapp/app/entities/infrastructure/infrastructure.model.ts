export interface IInfrastructure {
  infractructureId?: string | null;
  disasterId?: string | null;
  casualtyId?: string | null;
  infractructureTypeId?: string | null;
  damaged?: number | null;
  destroyed?: number | null;
  value?: number | null;
}

export class Infrastructure implements IInfrastructure {
  constructor(
    public infractructureId?: string | null,
    public disasterId?: string | null,
    public casualtyId?: string | null,
    public infractructureTypeId?: string | null,
    public damaged?: number | null,
    public destroyed?: number | null,
    public value?: number | null
  ) {}
}

export function getInfrastructureIdentifier(infrastructure: IInfrastructure): string | undefined {
  return infrastructure.infractructureId!;
}
