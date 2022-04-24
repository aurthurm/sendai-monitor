export interface IBeneficiary {
  beneficiaryId?: string;
  projectId?: string | null;
  amountReceived?: number | null;
  valueOfGoodsReceived?: number | null;
}

export class Beneficiary implements IBeneficiary {
  constructor(
    public beneficiaryId?: string,
    public projectId?: string | null,
    public amountReceived?: number | null,
    public valueOfGoodsReceived?: number | null
  ) {}
}

export function getBeneficiaryIdentifier(beneficiary: IBeneficiary): string | undefined {
  return beneficiary.beneficiaryId;
}
