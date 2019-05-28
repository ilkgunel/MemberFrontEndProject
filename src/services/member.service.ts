import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Member } from 'src/interface/member';
import { Observable, throwError } from 'rxjs';
import { FormGroup } from '@angular/forms';
import {catchError, first, map, tap} from 'rxjs/operators';
import { OperationResult } from 'src/interface/operationResult';
import { MemberWrapper } from 'src/interface/memberWrapper';
import { environment } from 'src/environments/environment';

@Injectable()
export class MemberService {
    response1 : Observable<HttpResponse<any>>;
    private postValue:string;
    private userMember:Member;
    private memberList: Array<Member> = [];
    private postValueAsJSON : string;

    constructor(private http: HttpClient,
                private memberWrapper: MemberWrapper) {
    }

    getMembers() {
        return this.http.get<Member[]>(environment.getAllMembersUrl);
    }

    addUserMembers(value) {       
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        this.memberWrapper.memberList.push(value);
        this.response1 = this.http.post<OperationResult>(environment.addUserMemberUrl,JSON.stringify(this.memberWrapper),{observe: 'response',headers: headers});
        return this.response1;
    }
}
