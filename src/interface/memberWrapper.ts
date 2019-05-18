import { Member } from 'src/interface/member';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MemberWrapper {
    memberList = [];
}