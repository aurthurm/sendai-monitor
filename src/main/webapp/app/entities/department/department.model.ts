export interface IDepartment {
  departmentId?: string;
  name?: string | null;
  phoneNumber?: string | null;
  countryId?: string | null;
  provinceId?: string | null;
  districtId?: string | null;
  wardId?: string | null;
  villageId?: string | null;
}

export class Department implements IDepartment {
  constructor(
    public departmentId?: string,
    public name?: string | null,
    public phoneNumber?: string | null,
    public countryId?: string | null,
    public provinceId?: string | null,
    public districtId?: string | null,
    public wardId?: string | null,
    public villageId?: string | null
  ) {}
}

export function getDepartmentIdentifier(department: IDepartment): string | undefined {
  return department.departmentId;
}
