export interface IDevelopmentPartner {
  partnerId?: string;
  name?: string | null;
  description?: string | null;
}

export class DevelopmentPartner implements IDevelopmentPartner {
  constructor(public partnerId?: string, public name?: string | null, public description?: string | null) {}
}

export function getDevelopmentPartnerIdentifier(developmentPartner: IDevelopmentPartner): string | undefined {
  return developmentPartner.partnerId;
}
