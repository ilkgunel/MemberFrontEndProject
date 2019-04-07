import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, of, pipe, throwError} from 'rxjs';
import {catchError, first, map, tap} from 'rxjs/operators';

import { Member } from 'src/interface/member';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Member>;
    public currentUser: Observable<Member>;
    private _url: string = 'http://localhost:8080/MemberRestAPIProject/login';

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Member>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Member {
        return this.currentUserSubject.value;
    }

  login(username: string, password: string) {
     return this.http.post<any>(this._url,{ username, password },{observe: 'response'})
       .pipe(tap((res: HttpResponse<any> ) => {
         localStorage.setItem('bearerToken', res.headers.get('Authorization'));
       }));
  }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    public getToken(): string {
      console.log('local storoge dan token alınıyor!');
      console.log(localStorage.getItem('bearerToken'));
      return localStorage.getItem('bearerToken');
    }
}
