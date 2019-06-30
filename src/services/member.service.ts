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
    response : Observable<HttpResponse<any>>;
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
        this.clearMemberList();       
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        this.memberWrapper.memberList.push(value);
        this.response = this.http.post<OperationResult>(environment.addUserMemberUrl,JSON.stringify(this.memberWrapper),{observe: 'response',headers: headers});
        return this.response;
    }

    addAdminMembers(value) {
        this.clearMemberList();       
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        this.memberWrapper.memberList.push(value);
        this.response = this.http.post<OperationResult>(environment.addAdminMemberUrl,JSON.stringify(this.memberWrapper),{observe: 'response',headers: headers});
        return this.response;
    }

    updateMember(value) { //To update both of admin and user
        this.clearMemberList();       
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        this.memberWrapper.memberList.push(value);
        this.response = this.http.put<OperationResult>(environment.updateAdminMemberUrl,JSON.stringify(this.memberWrapper),{observe: 'response',headers: headers});
        return this.response;
    }

    updateUserMember(value) { //To update only user
        this.clearMemberList();       
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        this.memberWrapper.memberList.push(value);
        this.response = this.http.put<OperationResult>(environment.updateUserMemberUrl,JSON.stringify(this.memberWrapper),{observe: 'response',headers: headers});
        return this.response;
    }

    deleteUserMember(value) {
        let memberIdList = [];
        for(let i = 0; i<value.length;i++) {
            memberIdList.push({'id': + value[i]});
        }
        const httpOptions = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'), body: JSON.stringify(memberIdList)
        };
        let response : Observable<OperationResult> = this.http.delete<OperationResult>(environment.deleteUserMemberUrl, httpOptions);
        return response;
    }

    deleteMember(value) {
        let memberIdList = [];
        for(let i = 0; i<value.length;i++) {
            memberIdList.push({'id': + value[i]});
        }
        const httpOptions = {
            headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'), body: JSON.stringify(memberIdList)
        };
        let response : Observable<OperationResult> = this.http.delete<OperationResult>(environment.deleteAdminMemberUrl, httpOptions);
        return response;
    }

    private clearMemberList(){
        this.memberWrapper.memberList = [];
    }
}
