import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from 'src/services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            } else if(err.status === 400) {
                console.log("400 hatası alındı!");
                err.error.result = err.error.errorMessage;
                console.log(err.error.result);
                return throwError(err);
            } else if(err.status === 403) {
                err.errorCode = 403;
                err.message = "Yetkisiz erişim ya da aktifleştirilmemiş hesap."
            } else if(err.status === 404) {
                err.error.errorCode = 404;
                err.error.result = err.message;
                err.error.message = err.message;
                err.statusText = err.message;
            }
            return throwError(err);
        }))
    }
}