export interface IHazard {
  hazardId?: string;
  type?: string | null;
  locationId?: string | null;
  mitigation?: string | null;
  description?: string | null;
  severity?: string | null;
}

export class Hazard implements IHazard {
  constructor(
    public hazardId?: string,
    public type?: string | null,
    public locationId?: string | null,
    public mitigation?: string | null,
    public description?: string | null,
    public severity?: string | null
  ) {}
}

export function getHazardIdentifier(hazard: IHazard): string | undefined {
  return hazard.hazardId;
}
