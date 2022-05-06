export interface IDepartment {
  departmentId?: string;
  name?: string | null;
  verification?: string | null;
}

export class Department implements IDepartment {
  constructor(
    public departmentId?: string,
    public name?: string | null,
    public verification?: string | null,
  ) {}
}

export function getDepartmentIdentifier(department: IDepartment): string | undefined {
  return department.departmentId;
}
