export interface ICountry {
  countryId?: string;
  name?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  level?: number | null;
}

export class Country implements ICountry {
  constructor(
    public countryId?: string,
    public name?: string | null,
    public latitude?: string | null,
    public longitude?: string | null,
    public level?: number | null
  ) {}
}

export function getCountryIdentifier(country: ICountry): string | undefined {
  return country.countryId;
}
