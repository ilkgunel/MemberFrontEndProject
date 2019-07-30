import * as jwt_decode from 'jwt-decode';
import { Role } from 'src/enum/role';
import { Injectable } from '@angular/core';

@Injectable({providedIn : 'root'})
export class SecurityUtil {

    isAdmin() :boolean {
        var decoded = jwt_decode(localStorage.getItem('bearerToken'));
        if(Role.Admin == decoded.roles){
          return true;
        } else {
          return false;
        }
    }

    mailAddressFromToken() : string {
      var decoded = jwt_decode(localStorage.getItem('bearerToken'));
      return decoded.sub;
    }
}