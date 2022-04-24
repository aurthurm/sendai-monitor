export interface IInfrastructureType {
  infractructureTypeId?: string;
  name?: string | null;
}

export class InfrastructureType implements IInfrastructureType {
  constructor(public infractructureTypeId?: string, public name?: string | null) {}
}

export function getInfrastructureTypeIdentifier(infrastructureType: IInfrastructureType): string | undefined {
  return infrastructureType.infractructureTypeId;
}
