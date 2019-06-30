import * as jwt_decode from 'jwt-decode';
import { Role } from 'src/enum/role';
import { Injectable } from '@angular/core';

@Injectable({providedIn : 'root'})
export class SecurtyUtil {

    isAdmin() :boolean {
        var decoded = jwt_decode(localStorage.getItem('bearerToken'));
        if(Role.Admin == decoded.roles){
          return true;
        } else {
          return false;
        }
    }
}