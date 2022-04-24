export interface IProject {
  projectId?: string;
  disasterId?: string;
  name?: string | null;
  description?: string | null;
  value?: number | null;
  projectManager?: string | null;
  locationId?: string | null;
}

export class Project implements IProject {
  constructor(
    public projectId?: string,
    public disasterId?: string,
    public name?: string | null,
    public description?: string | null,
    public value?: number | null,
    public projectManager?: string | null,
    public locationId?: string | null
  ) {}
}

export function getProjectIdentifier(project: IProject): string | undefined {
  return project.projectId;
}
