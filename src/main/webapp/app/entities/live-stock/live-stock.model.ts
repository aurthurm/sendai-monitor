export interface ILiveStock {
  liveStockId?: string;
  disasterId?: string | null;
  casualtyId?: string | null;
  liveStockTypeId?: string | null;
  died?: number | null;
  missing?: number | null;
  ill?: number | null;
  estimatedLoss?: number | null;
  injured?: number | null;
  liveStocks?: ILiveStock[];
}

export class LiveStock implements ILiveStock {
  constructor(
    public liveStockId?: string,
    public disasterId?: string | null,
    public casualtyId?: string | null,
    public liveStockTypeId?: string | null,
    public died?: number | null,
    public missing?: number | null,
    public ill?: number | null,
    public estimatedLoss?: number | null,
    public injured?: number | null,
    
    public liveStocks?: ILiveStock[],
  ) {}
}

export function getLiveStockIdentifier(liveStock: ILiveStock): string | undefined {
  return liveStock.liveStockId;
}
