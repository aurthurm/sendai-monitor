export interface IResponseTeam {
  responseTeamId?: string;
  disasterId?: string | null;
  name?: string | null;
  teamLead?: string | null;
}

export class ResponseTeam implements IResponseTeam {
  constructor(
    public responseTeamId?: string,
    public disasterId?: string | null,
    public name?: string | null,
    public teamLead?: string | null
  ) {}
}

export function getResponseTeamIdentifier(responseTeam: IResponseTeam): string | undefined {
  return responseTeam.responseTeamId;
}
