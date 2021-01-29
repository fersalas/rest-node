import { ModificationNote } from '../../common/interfaces/modification_note.interface';
export interface UsersDto {
  id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  permissionLevel?: number;
  modification_notes: ModificationNote[];
}
