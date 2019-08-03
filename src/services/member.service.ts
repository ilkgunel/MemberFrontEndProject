import { Injectable, Inject } from "@angular/core";
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Member } from 'src/interface/member';
import { Observable } from 'rxjs';
import { OperationResult } from 'src/interface/operationResult';
import { MemberWrapper } from 'src/interface/memberWrapper';
import { environment } from 'src/environments/environment';
import { CheckPasswordResetToken } from 'src/interface/CheckPasswordResetToken';
import { LOCALE_ID } from '@angular/core';
import { ResestPasswordInterface } from 'src/interface/resetPasswordInterface';
import { UpdatePasswordInterface } from 'src/interface/updatePasswordInterface';
import { ResetPasswordTokenInterface } from 'src/interface/resetPasswordTokenInterface';

@Injectable()
export class MemberService {
    response : Observable<HttpResponse<any>>;
    private postValue:string;
    private userMember:Member;
    private memberList: Array<Member> = [];
    private postValueAsJSON : string;

    constructor(private http: HttpClient,
                private memberWrapper: MemberWrapper,
                @Inject(LOCALE_ID) private locale:string) {
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
        this.response = this.http.put<OperationResult>(environment.updateMemberByAdminUrl,JSON.stringify(this.memberWrapper),{observe: 'response',headers: headers});
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
        let response : Observable<OperationResult> = this.http.delete<OperationResult>(environment.deleteMemberByAdminUrl, httpOptions);
        return response;
    }

    checkingPasswordResetToken(token) {
        let checkPasswordResetToken:CheckPasswordResetToken = {} as any;
        checkPasswordResetToken.token = token;
        checkPasswordResetToken.locale = this.locale.substr(0,2);
        this.response = this.http.post<OperationResult>(environment.checkResetPasswordTokenUrl,JSON.stringify(checkPasswordResetToken),{observe: 'response',headers: this.getHeaders()});
        return this.response;
    }

    sendingPasswordResetMail(value) {
        let resetPasswordTokenInterface:ResetPasswordTokenInterface = {} as any;
        resetPasswordTokenInterface.email = value.email;
        resetPasswordTokenInterface.locale = this.locale.substr(0,2);
        this.response = this.http.post<OperationResult>(environment.sentPasswordResetMailUrl,JSON.stringify(resetPasswordTokenInterface),{observe: 'response',headers: this.getHeaders()});
        return this.response;
    }

    resetPassword(newPassword, repeatedNewPassword, token) {
        let resestPasswordInterface:ResestPasswordInterface = {} as any;
        resestPasswordInterface.newPassword = newPassword;
        resestPasswordInterface.repeatedNewPassword = repeatedNewPassword;
        resestPasswordInterface.token = token;
        resestPasswordInterface.locale = this.locale.substr(0,2);
        this.response = this.http.post<OperationResult>(environment.resetPasswordUrl,JSON.stringify(resestPasswordInterface),{observe: 'response',headers: this.getHeaders()});
        return this.response;
    }

    updatePassword(emailOfCurrentUser, newPassword, oldPassword) {
        let updatePasswordInterface:UpdatePasswordInterface = {} as any;
        updatePasswordInterface.email = emailOfCurrentUser;
        updatePasswordInterface.newPassword = newPassword;
        updatePasswordInterface.oldPassword = oldPassword;

        this.response = this.http.post<OperationResult>(environment.updatePasswordUrl,JSON.stringify(updatePasswordInterface),{observe: 'response',headers: this.getHeaders()});
        return this.response;
    }

    private clearMemberList(){
        this.memberWrapper.memberList = [];
    }

    private getHeaders() : HttpHeaders {
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return headers;
    }
}
