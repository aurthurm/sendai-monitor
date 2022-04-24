export interface ICrop {
  cropId?: string;
  disasterId?: string | null;
  casualtyId?: string | null;
  cropTypeId?: string | null;
  hecterageAffected?: number | null;
  estimatedLoss?: number | null;
}

export class Crop implements ICrop {
  constructor(
    public cropId?: string,
    public disasterId?: string | null,
    public casualtyId?: string | null,
    public cropTypeId?: string | null,
    public hecterageAffected?: number | null,
    public estimatedLoss?: number | null
  ) {}
}

export function getCropIdentifier(crop: ICrop): string | undefined {
  return crop.cropId;
}
