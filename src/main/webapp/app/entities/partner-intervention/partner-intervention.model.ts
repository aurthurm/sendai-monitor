export interface IPartnerIntervention {
  inteventionId?: string;
  partnerId?: string | null;
  disasterId?: string | null;
  projectId?: string | null;
  hazardId?: string | null;
  amountReceived?: number | null;
  assistanceOffered?: string | null;
}

export class PartnerIntervention implements IPartnerIntervention {
  constructor(
    public inteventionId?: string,
    public partnerId?: string | null,
    public disasterId?: string | null,
    public projectId?: string | null,
    public hazardId?: string | null,
    public amountReceived?: number | null,
    public assistanceOffered?: string | null
  ) {}
}

export function getPartnerInterventionIdentifier(partnerIntervention: IPartnerIntervention): string | undefined {
  return partnerIntervention.inteventionId;
}
