import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, of, pipe, throwError} from 'rxjs';
import {catchError, first, map, tap} from 'rxjs/operators';

import { Member } from 'src/interface/member';
import { error } from 'util';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public currentUser: Observable<Member>;
    private _url: string = 'http://localhost:8080/MemberRestAPIProject/login';

    constructor(private http: HttpClient) {
    }

  login(username: string, password: string) {
     return this.http.post<any>(this._url,{ username, password },{observe: 'response'})
       .pipe(tap((res: HttpResponse<any> ) => {
         localStorage.setItem('bearerToken', res.headers.get('Authorization'));
       }));
  }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('bearerToken');
    }

    public getToken(): string {
      return localStorage.getItem('bearerToken');
    }
}
