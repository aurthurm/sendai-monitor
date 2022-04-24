export interface IHousehold {
  householdId?: string | null;
  disasterId?: string | null;
  householdTypeId?: string | null;
  numberOfHouseholds?: string | null;
  numberChildHeaded?: number | null;
  numberFemaleHeaded?: number | null;
  numberOfPeopleAffected?: number | null;
}

export class Household implements IHousehold {
  constructor(
    public householdId?: string | null,
    public disasterId?: string | null,
    public householdTypeId?: string | null,
    public numberOfHouseholds?: string | null,
    public numberChildHeaded?: number | null,
    public numberFemaleHeaded?: number | null,
    public numberOfPeopleAffected?: number | null
  ) {}
}

export function getHouseholdIdentifier(household: IHousehold): string | undefined {
  return household.householdId!;
}
