export interface IDistrict {
  districtId?: string;
  provinceId?: string | null;
  name?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  level?: number | null;
}

export class District implements IDistrict {
  constructor(
    public districtId?: string,
    public provinceId?: string | null,
    public name?: string | null,
    public latitude?: string | null,
    public longitude?: string | null,
    public level?: number | null
  ) {}
}

export function getDistrictIdentifier(district: IDistrict): string | undefined {
  return district.districtId;
}
