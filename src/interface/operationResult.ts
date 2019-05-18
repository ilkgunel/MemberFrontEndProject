import { Member } from './member';

export interface OperationResult {
    result: string;
    memberList: Member[];
    errorCode :string;
}