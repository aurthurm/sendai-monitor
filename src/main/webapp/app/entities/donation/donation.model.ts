export interface IDonation {
  donorId?: string;
  disasterId?: string | null;
  name?: string | null;
  type?: string | null;
  valueOfDonation?: number | null;
}

export class Donation implements IDonation {
  constructor(
    public donorId?: string,
    public disasterId?: string | null,
    public name?: string | null,
    public type?: string | null,
    public valueOfDonation?: number | null
  ) {}
}

export function getDonationIdentifier(donation: IDonation): string | undefined {
  return donation.donorId;
}
