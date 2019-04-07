import { RoleOfMember } from './roleofmember';

export interface Member {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    enabled: boolean;
    password: string;
    memberLanguageCode: string;
    roleOfMember: RoleOfMember;
}
