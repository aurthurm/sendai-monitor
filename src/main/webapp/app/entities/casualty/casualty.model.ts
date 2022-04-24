import dayjs from 'dayjs/esm';
import { SEX } from 'app/entities/enumerations/sex.model';

export interface ICasualty {
  casualtyId?: string;
  disasterId?: string | null;
  nationalId?: string | null;
  anonymous?: boolean | null;
  firstName?: string | null;
  lastName?: string | null;
  dob?: dayjs.Dayjs | null;
  dobEstimated?: boolean | null;
  age?: number | null;
  sex?: SEX | null;
  dependents?: number | null;
  occupation?: string | null;
  nationality?: string | null;
  displaced?: boolean | null;
  affected?: boolean | null;
  injured?: boolean | null;
  missing?: boolean | null;
  dead?: boolean | null;
  disabilityBefore?: boolean | null;
  disabilityAfter?: boolean | null;
  replay?: boolean | null;
}

export class Casualty implements ICasualty {
  constructor(
    public casualtyId?: string,
    public disasterId?: string | null,
    public nationalId?: string | null,
    public firstName?: string | null,
    public lastName?: string | null,
    public anonymous?: boolean | null,
    public dob?: dayjs.Dayjs | null,
    public dobEstimated?: boolean | null,
    public age?: number | null,
    public sex?: SEX | null,
    public dependents?: number | null,
    public occupation?: string | null,
    public nationality?: string | null,
    public displaced?: boolean | null,
    public affected?: boolean | null,
    public injured?: boolean | null,
    public missing?: boolean | null,
    public dead?: boolean | null,
    public disabilityBefore?: boolean | null,
    public disabilityAfter?: boolean | null,
    public replay?: boolean | null
  ) {
    this.anonymous = this.anonymous ?? false;
    this.dobEstimated = this.dobEstimated ?? false;
    this.displaced = this.displaced ?? false;
    this.affected = this.affected ?? false;
    this.injured = this.injured ?? false;
    this.missing = this.missing ?? false;
    this.dead = this.dead ?? false;
    this.disabilityBefore = this.disabilityBefore ?? false;
    this.disabilityAfter = this.disabilityAfter ?? false;
    this.replay = this.replay ?? false;
  }
}

export function getCasualtyIdentifier(casualty: ICasualty): string | undefined {
  return casualty.casualtyId;
}
