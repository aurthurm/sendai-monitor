export interface IVillage {
  villageId?: string;
  wardId?: string | null;
  name?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  level?: number | null;
}

export class Village implements IVillage {
  constructor(
    public villageId?: string,
    public wardId?: string | null,
    public name?: string | null,
    public latitude?: string | null,
    public longitude?: string | null,
    public level?: number | null
  ) {}
}

export function getVillageIdentifier(village: IVillage): string | undefined {
  return village.villageId;
}
