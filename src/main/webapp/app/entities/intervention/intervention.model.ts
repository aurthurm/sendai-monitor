export interface IIntervention {
  interventionId?: string;
  name?: string | null;

}

export class Intervention implements IIntervention {
  constructor(
    public interventionId?: string,
    public name?: string | null,

  ) {}
}

export function getInterventionIdentifier(intervention: IIntervention): string | undefined {
  return intervention.interventionId;
}
