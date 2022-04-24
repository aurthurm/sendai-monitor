export interface IHouseholdType {
  householdTypeId?: string;
  name?: string | null;
}

export class HouseholdType implements IHouseholdType {
  constructor(public householdTypeId?: string, public name?: string | null) {}
}

export function getHouseholdTypeIdentifier(householdType: IHouseholdType): string | undefined {
  return householdType.householdTypeId;
}
