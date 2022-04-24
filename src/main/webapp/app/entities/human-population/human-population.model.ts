export interface IHumanPopulation {
  humanPopulationId: string,
  disasterId?: string | null,
  populationType?: string | null,
  disabled?: string | null,
  value?: number | null,
  humanPopulationDisasterCategoryId?: string | null,
  humanPopulationDisasterCategoryName?: string | null,
}

export class HumanPopulation implements IHumanPopulation {
  constructor(
    public humanPopulationId: string,
    public disasterId?: string | null,
    public populationType?: string | null,
    public disabled?: string | null,
    public value?: number | null,
    public humanPopulationDisasterCategoryId?: string | null,
    public humanPopulationDisasterCategoryName?: string | null,
  ) {}
}

export function getHumanPopulationIdentifier(humanPopulation: IHumanPopulation): string | undefined {
  return humanPopulation.humanPopulationId;
}
