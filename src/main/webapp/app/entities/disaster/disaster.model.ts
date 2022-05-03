import dayjs from 'dayjs/esm';
import { LOCATION } from 'app/entities/enumerations/location.model';
import { IDisasterType } from 'app/entities/disaster-type/disaster-type.model';
import { IDisasterCategory} from 'app/entities/disaster-category/disaster-category.model';

export interface IVillage {
  id: string,
  level: number,
  name: string,
  provinces: IProvince[]
}

export interface IWard {
  id: string,
  level: number,
  name: string,
  villages: IVillage[]
}

export interface IDistrict {
  id: string,
  level: number,
  name: string,
  wards: IWard[]
}

export interface IProvince {
  id: string,
  level: number,
  name: string,
  districts: IDistrict[]
}

export interface IDisasterIntervention{
  interventionId: string,
  name: string,
}

export interface ITreeData {
  id: string,
  level: number,
  name: string,
  provinces: IProvince[]
}


export interface IDisasterApproval {
  disasterId?: string;
  approval?: string;
  comment?: string;
  status?: string;
}

export interface IDisaster {
  disasterId?: string;
  departmentId?: string | null;
  name?: string | null;
  hazardId?: string | null;
  type?: string | null;
  cause?: string | null;
  location?: LOCATION | null;
  locationId?: string | null;
  description?: string | null;
  disasterCategoryId?: string | null;
  disasterCategory?: IDisasterCategory;
  disasterTypeId?: string | null;
  disasterType?: IDisasterType;
  caseId?: string | null;
  estimatedDamage?: string | null;
  isDeclared?: boolean | null;
  declarationDate?: dayjs.Dayjs | null;
  incidentDate?: dayjs.Dayjs | null;
  closureDate?: dayjs.Dayjs | null;
  intervention?: string | null;
  currency?: string | null;
  disasterInterventionRequired?: IDisasterIntervention[];
  approvalStatus?: string;
	approvalComment?: string;
	approvedBy?: string;
	eligibleForApproval?: string;
  targetPopulation?: string;
  targetPopulationEstimate?: string;
  affectedPopulation?: string;
  dipTank?: string;
  longitude?: string;
  latitude?: string;
  
}

export class Disaster implements IDisaster {
  constructor(
    public disasterId?: string,
    public departmentId?: string | null,
    public name?: string | null,
    public hazardId?: string | null,
    public type?: string | null,
    public cause?: string | null,
    public location?: LOCATION | null,
    public locationId?: string | null,
    public description?: string | null,
    public disasterCategoryId?: string | null,
    public disasterTypeId?: string | null,
    public caseId?: string | null,
    public estimatedDamage?: string | null,
    public isDeclared?: boolean | null,
    public declarationDate?: dayjs.Dayjs | null,
    public incidentDate?: dayjs.Dayjs | null,
    public closureDate?: dayjs.Dayjs | null,
    public intervention?: string | null,
    public currency?: string | null,
    public disasterIntervention?: IDisasterIntervention[],
    public approvalStatus?: string,
    public approvalComment?: string,
    public approvedBy?: string,
    public eligibleForApproval?: string,
    public targetPopulation?: string,
    public targetPopulationEstimate?: string,
    public affectedPopulation?: string,
    public longitude?: string,
    public latitude?: string,
    
  ) {
    this.isDeclared = this.isDeclared ?? false;
  }
}

export function getDisasterIdentifier(disaster: IDisaster): string | undefined {
  return disaster.disasterId;
}
