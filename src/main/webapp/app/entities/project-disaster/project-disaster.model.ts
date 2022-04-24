export interface IProjectDisaster {
  projectDisasterId?: string;
  projectId?: string | null;
  disastertId?: string | null;
}

export class ProjectDisaster implements IProjectDisaster {
  constructor(public projectDisasterId?: string, public projectId?: string | null, public disastertId?: string | null) {}
}

export function getProjectDisasterIdentifier(projectDisaster: IProjectDisaster): string | undefined {
  return projectDisaster.projectDisasterId;
}
