export interface ICropType {
  cropTypeId?: string;
  name?: string | null;
}

export class CropType implements ICropType {
  constructor(public cropTypeId?: string, public name?: string | null) {}
}

export function getCropTypeIdentifier(cropType: ICropType): string | undefined {
  return cropType.cropTypeId;
}
