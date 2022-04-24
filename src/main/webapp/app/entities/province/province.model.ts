export interface IProvince {
  countryId?: string;
  provinceId?: string | null;
  name?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  level?: number | null;
}

export class Province implements IProvince {
  constructor(
    public countryId?: string,
    public provinceId?: string | null,
    public name?: string | null,
    public latitude?: string | null,
    public longitude?: string | null,
    public level?: number | null
  ) {}
}

export function getProvinceIdentifier(province: IProvince): string | undefined {
  return province.countryId;
}
