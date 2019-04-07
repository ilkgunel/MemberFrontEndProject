import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from 'src/services/authentication.service';

@Injectable()
export class JwtInterceptor  implements HttpInterceptor
{
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        if (this.authenticationService.getToken() != null) {
          console.log('intercept içinde!');
          console.log(this.authenticationService.getToken());
          request = request.clone({
            setHeaders: {
              Authorization: this.authenticationService.getToken()
            }
          });
        }
        return next.handle(request);
    }
}
