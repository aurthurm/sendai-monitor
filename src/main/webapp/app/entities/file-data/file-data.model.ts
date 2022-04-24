import { FILE } from 'app/entities/enumerations/file.model';
import { TARGET } from 'app/entities/enumerations/target.model';

export interface IFileData {
  fileId?: string;
  file?: string | null;
  name?: string | null;
  type?: FILE | null;
  target?: TARGET | null;
  targetId?: string | null;
  location?: string | null;
}

export class FileData implements IFileData {
  constructor(
    public fileId?: string,
    public name?: string | null,
    public type?: FILE | null,
    public target?: TARGET | null,
    public targetId?: string | null,
    public location?: string | null
  ) {}
}

export function getFileDataIdentifier(fileData: IFileData): string | undefined {
  return fileData.fileId;
}
