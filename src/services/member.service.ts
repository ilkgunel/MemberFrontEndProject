import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Member } from 'src/interface/member';
import { Observable, throwError } from 'rxjs';
import { FormGroup } from '@angular/forms';
import {catchError, first, map, tap} from 'rxjs/operators';
import { OperationResult } from 'src/interface/operationResult';
import { MemberWrapper } from 'src/interface/memberWrapper';

@Injectable()
export class MemberService {
    response1 : Observable<HttpResponse<any>>;
    private postValue:string;
    private userMember:Member;
    private memberList: Array<Member> = [];
    private postValueAsJSON : string;
    private _url:string = 'http://localhost:8080/MemberRestAPIProject/memberGetWebServiceEndPoint/getAllMembers';
    private _userMemberAddUrl = 'http://localhost:8080/MemberRestAPIProject/memberPostWebServiceEndPoint/saveUserMember';

    constructor(private http: HttpClient,
                private memberWrapper: MemberWrapper) {
    }

    getMembers() {
        return this.http.get<Member[]>(this._url);
    }

    addUserMembers(value) {       
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        this.memberWrapper.memberList.push(value);
        this.response1 = this.http.post<OperationResult>(this._userMemberAddUrl,JSON.stringify(this.memberWrapper),{observe: 'response',headers: headers});
        return this.response1;
    }
}
