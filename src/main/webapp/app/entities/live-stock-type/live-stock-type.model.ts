export interface ILiveStockType {
  liveStockTypeId?: string;
  name?: string | null;
}

export class LiveStockType implements ILiveStockType {
  constructor(public liveStockTypeId?: string, public name?: string | null) {}
}

export function getLiveStockTypeIdentifier(liveStockType: ILiveStockType): string | undefined {
  return liveStockType.liveStockTypeId;
}
