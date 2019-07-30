import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of, pipe, throwError} from 'rxjs';
import {catchError, first, map, tap} from 'rxjs/operators';

import { Member } from 'src/interface/member';
import { error } from 'util';
import { environment } from 'src/environments/environment.prod';
import { SecurityUtil } from 'src/security/security.util';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public currentUser: Observable<Member>;
    private _url: string = 'http://localhost:8080/MemberRestAPIProject/login';
    private _logoutUrl : string = 'http://localhost:8080/MemberRestAPIProject/logout/'
    private _logoutUrl1 : string = 'http://localhost:8080/MemberRestAPIProject/logout'

    constructor(private http: HttpClient,
                private securityUtil: SecurityUtil) {
    }

  login(username: string, password: string) {
     return this.http.post<any>(this._url,{ username, password },{observe: 'response'})
       .pipe(tap((res: HttpResponse<any> ) => {
         localStorage.setItem('bearerToken', res.headers.get('Authorization'));
       }));
  }

    logout() {
      //call the logout service
      const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
      let token = this.getToken();
      let user = this.securityUtil.mailAddressFromToken();
      let postValue = { user,token };
      console.log("postValue");
      console.log(postValue);
      this.http.post<any>(this._logoutUrl, postValue, {observe: 'response', headers:headers})      .subscribe(
        data => {
          console.log("data");
          console.log(data);
        },
        (error:HttpErrorResponse) => {
          console.log(error);
        }
      ); 
      // remove user from local storage to log user out
      localStorage.removeItem('bearerToken');
    }

    public getToken(): string {
      return localStorage.getItem('bearerToken');
    }
}
