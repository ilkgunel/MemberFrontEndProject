import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from 'src/services/authentication.service';

import * as jwt_decode from 'jwt-decode';

@Injectable({providedIn : 'root'})
export class AuthGuard implements CanActivate{
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const bearerToken = this.authenticationService.getToken();
        if(bearerToken == null) {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
        else if (bearerToken != null && route.data.roles) {
            // logged in so return true
            var decoded = jwt_decode(bearerToken);
            var currentUserRole = decoded.roles;
            if(route.data.roles.indexOf(currentUserRole) === -1) {
                // role not authorised so redirect to access denied page
                this.router.navigate(['/access-denied']);
                return false;
            }
            return true;
        } else {
            this.router.navigate(['/']);
                return false;
        }
    }
}
