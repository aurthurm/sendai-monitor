import dayjs from 'dayjs/esm';

export interface IDonation {
  donorId?: string;
  disasterId?: string | null;
  name?: string | null;
  type?: string | null;
  valueOfDonation?: number | null;
  valueUtelized?: number | null,
  currency?: string | null,
  comment?: string | null,
  utelizationComment?: string | null,
  dateIssued?: dayjs.Dayjs | null,
  developmentPartnerId?: string | null
}

export class Donation implements IDonation {
  constructor(
    public donorId?: string,
    public disasterId?: string | null,
    public name?: string | null,
    public type?: string | null,
    public valueOfDonation?: number | null,
    public valueUtelized?: number | null,
    public currency?: string | null,
    public comment?: string | null,
    public utelizationComment?: string | null,
    public dateIssued?: dayjs.Dayjs | null,
    public developmentPartnerId?: string | null
  ) {}
}

export function getDonationIdentifier(donation: IDonation): string | undefined {
  return donation.donorId;
}
