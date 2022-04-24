export interface IDisasterCategory {
  disasterCategoryId?: string;
  name?: string | null;
}

export class DisasterCategory implements IDisasterCategory {
  constructor(public disasterCategoryId?: string, public name?: string | null) {}
}

export function getDisasterCategoryIdentifier(disasterCategory: IDisasterCategory): string | undefined {
  return disasterCategory.disasterCategoryId;
}
