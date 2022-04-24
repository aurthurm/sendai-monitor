export interface IAddress {
  addressId?: string;
  casualtyId?: string | null;
  street?: string | null;
  countryId?: string | null;
  provinceId?: string | null;
  districtId?: string | null;
}

export class Address implements IAddress {
  constructor(
    public addressId?: string,
    public casualtyId?: string | null,
    public street?: string | null,
    public countryId?: string | null,
    public provinceId?: string | null,
    public districtId?: string | null
  ) {}
}

export function getAddressIdentifier(address: IAddress): string | undefined {
  return address.addressId;
}
