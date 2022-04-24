export interface IWard {
  wardId?: string;
  districtId?: string | null;
  name?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  level?: number | null;
}

export class Ward implements IWard {
  constructor(
    public wardId?: string,
    public districtId?: string | null,
    public name?: string | null,
    public latitude?: string | null,
    public longitude?: string | null,
    public level?: number | null
  ) {}
}

export function getWardIdentifier(ward: IWard): string | undefined {
  return ward.wardId;
}
