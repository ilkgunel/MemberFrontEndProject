import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Member } from 'src/interface/member';
import { Observable } from 'rxjs';

@Injectable()
export class MemberService {
    private _url:string = 'http://localhost:8080/MemberRestAPIProject/memberGetWebServiceEndPoint/getAllMembers';

    constructor(private http: HttpClient) {
    }

    getMembers() {
        return this.http.get<Member[]>(this._url);
    }
}
