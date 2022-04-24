export interface IDisasterType {
  disasterTypeId?: string;
  disasterCategoryId?: string | null;
  name?: string | null;
}

export class DisasterType implements IDisasterType {
  constructor(public disasterTypeId?: string, public disasterCategoryId?: string | null, public name?: string | null) {}
}

export function getDisasterTypeIdentifier(disasterType: IDisasterType): string | undefined {
  return disasterType.disasterTypeId;
}
